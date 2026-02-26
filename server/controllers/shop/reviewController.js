const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Review = require("../../models/Review");

const createReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;

    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res
        .status(403)
        .json({ success: false, message: "You need to order to review" });
    }

    const checkExistingReview = await Review.findOne({ productId, userId });

    if (checkExistingReview) {
      return res
        .status(403)
        .json({ success: false, message: "You already reviews this product" });
    }

    const newReview = new Review({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const reviews = await Review.find({ productId });

    const totalReviewsLength = reviews.length;

    const averageReview =
      reviews.reduce((acc, curr) => acc + curr.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({ success: true, data: newReview });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId });

    res.status(200).json({ success: true, data: reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createReview, getReviews };
