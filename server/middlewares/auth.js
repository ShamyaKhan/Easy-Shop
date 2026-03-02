const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../utils/constants");

// const auth = async (req, res, next) => {
//   const token = req.cookies["token"];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "You are not authorized!" });
//   }

//   try {
//     const decodedUser = jwt.verify(token, JWT_SECRET_KEY);
//     req.user = decodedUser;
//     next();
//   } catch (err) {
//     res
//       .status(401)
//       .json({ success: false, message: "You are not authorized!" });
//   }
// };

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized!" });
  }

  try {
    const decodedUser = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decodedUser;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "You are not authorized!" });
  }
};

module.exports = auth;
