const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/authRoutes");
const adminProductRouter = require("./routes/admin/productRoutes");
const { PORT, MONGODB_URI } = require("./utils/constants");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductRouter);

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log("Listening on port", PORT);
    });
  } catch (err) {
    console.log("Could not connect to database", err);
  }
};

startServer();
