const { STRIPE_SECRET_KEY } = require("../../utils/constants");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const Order = require("../../models/Order");

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
    const { paymentId, payerId, orderId } = req.body;
    let order = Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found!" });
    }

    order.paymentStatus = "paid";
    ((order.orderStatus = "confirmed"), (order.paymentId = paymentId));
    order.payerId = payerId;

    await order.save();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, capturePayment };
