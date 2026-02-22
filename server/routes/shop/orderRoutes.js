const express = require("express");
const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require("../../controllers/shop/orderController");

const router = express.Router();

router.post("/create-order", createOrder);

router.post("/capture-payment", capturePayment);

router.get("/order-list/:userId", getAllOrdersByUser);

router.get("/order-details/:id", getOrderDetails);

module.exports = router;
