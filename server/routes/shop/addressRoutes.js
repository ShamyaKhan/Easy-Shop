const express = require("express");
const {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/shop/addressController");

const router = express.Router();

router.post("/add-address", addAddress);

router.get("/get-address/:userId", fetchAllAddress);

router.put("/update-address/:userId/:addressId", editAddress);

router.delete("/delete/:userId/:addressId", deleteAddress);

module.exports = router;
