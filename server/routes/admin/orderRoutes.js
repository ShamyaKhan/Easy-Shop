const express = require("express");
const {
  getAllOrders,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/orderController");

const router = express.Router();

router.get("/all-orders", getAllOrders);

router.get("/order-details/:id", getOrderDetailsForAdmin);

router.put("/update-order/:id", updateOrderStatus);

module.exports = router;
