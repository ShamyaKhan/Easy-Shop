const express = require("express");
const auth = require("../../middlewares/auth");
const {
  register,
  login,
  logout,
} = require("../../controllers/auth/authController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/check-auth", auth, (req, res) => {
  const user = req.user;
  res.status(200).json({ success: true, message: "Authenticated!", user });
});

module.exports = router;
