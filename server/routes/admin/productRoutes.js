const express = require("express");
const { upload } = require("../../utils/cloudinary");
const {
  handleImageUpload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchAllProducts,
} = require("../../controllers/admin/productController");

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

router.post("/add-product", addProduct);

router.put("/edit-product/:id", editProduct);

router.delete("/delete-product/:id", deleteProduct);

router.get("/get-products", fetchAllProducts);

module.exports = router;
