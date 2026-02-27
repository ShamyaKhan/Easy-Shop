const express = require("express");
const {
  addFeatureImage,
  getFeatureImages,
} = require("../../controllers/common/featureController");

const router = express.Router();

router.post("/add-feature", addFeatureImage);

router.get("/get-features", getFeatureImages);

module.exports = router;
