const express = require("express");
const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/productController");

const router = express.Router();

router.get("/get-products", getFilteredProducts);

router.get("/get-product-details/:id", getProductDetails);

module.exports = router;
