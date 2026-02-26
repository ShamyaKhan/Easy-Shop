const Product = require("../../models/Product");

const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      return res
        .status(400)
        .json({ success: false, message: "Keyword must be string" });
    }

    const regex = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        { title: regex },
        { description: regex },
        { category: regex },
        { brand: regex },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({ success: true, data: searchResults });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { searchProducts };
