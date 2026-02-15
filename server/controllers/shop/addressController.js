const addAddress = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const editAddress = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { addAddress, fetchAllAddress, editAddress, deleteAddress };
