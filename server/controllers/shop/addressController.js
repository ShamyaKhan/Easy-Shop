const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, phone, pincode, notes } = req.body;

    if (!userId || !address || !city || !phone || !pincode || !notes) {
      return res.status(400).json({ success: false, message: "Invalid data" });
    }

    const newAddress = new Address({
      userId,
      address,
      phone,
      city,
      pincode,
      notes,
    });

    await newAddress.save();

    res.status(201).json({ success: true, data: newAddress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id Required!" });
    }

    const addressList = await Address.find({ userId });

    res.status(200).json({ success: true, data: addressList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id and Address Id Required" });
    }

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true },
    );

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address Not Found" });
    }

    res.status(200).json({ success: true, data: address });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ success: false, message: "User Id and Address Id Required" });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address Not Found" });
    }

    res.status(200).json({ success: true, message: "Address Deleted!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
