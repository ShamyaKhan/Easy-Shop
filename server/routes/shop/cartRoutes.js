const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItemsQty,
  deleteCartItem,
} = require("../../controllers/shop/cartController");

const router = express.Router();

router.post("/add-to-cart", addToCart);

router.get("/get-cart-items/:userId", fetchCartItems);

router.put("/update-cart", updateCartItemsQty);

router.delete("/delete-cart-item/:userId/:productId", deleteCartItem);

module.exports = router;
