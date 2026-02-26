const express = require("express");
const {
  createReview,
  getReviews,
} = require("../../controllers/shop/reviewController");

const router = express.Router();

router.post("/create-review", createReview);

router.get("/get-reviews/:productId", getReviews);

module.exports = router;
