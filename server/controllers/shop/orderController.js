const { STRIPE_SECRET_KEY } = require("../../utils/constants");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      success_url: `http://localhost:5173/shop/payment-return?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/shop/payment-cancel`,
    });

    // Save order with pending payment
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending",
      paymentMethod: "stripe",
      paymentStatus: "unpaid",
      totalAmount,
      orderDate: new Date(),
    });

    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      approvalURL: session.url,
      orderId: newlyCreatedOrder._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, orderId } = req.body;
    let order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found!" });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Not enough stock" });
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    const cartId = order.cartId;

    await Cart.findByIdAndDelete(cartId);

    await order.save();

    res
      .status(200)
      .json({ success: true, message: "Order Confirmed!", data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "No order found" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
