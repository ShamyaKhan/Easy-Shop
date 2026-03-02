const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { JWT_SECRET_KEY } = require("../../utils/constants");

const register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User exists with this email. Please try another email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({ userName, email, password: hashPassword });

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Registration Successful!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist!",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, user.password);

    if (!checkPasswordMatch) {
      return res.json({ success: false, message: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      JWT_SECRET_KEY,
      { expiresIn: "60m" },
    );

    res.cookie("token", token, { httpOnly: true, secure: true }).json({
      success: true,
      message: "Logged in successfully!",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged Out!" });
};

module.exports = { register, login, logout };
