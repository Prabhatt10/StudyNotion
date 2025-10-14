const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cloudinary = require("./config/cloudinary.js");
require("dotenv").config();

// Import routes
const auth = require("./routes/auth.js");
const category = require("./routes/category.js");
const course = require("./routes/course.js");
// const payment = require("./routes/payment.js");
const profile = require("./routes/profile.js");
const resetPassword = require("./routes/resetPassword.js");
const reviewAndRating = require("./routes/reviewAndRating.js");
const sectionAndSubsection = require("./routes/sectionAndSubsection.js");

// Initialize app
const app = express();

// Port
const PORT = process.env.PORT || 4000;

// Database connection
const dbConnect = require("./config/database.js");
dbConnect();

// =======================
// 🔧 Middlewares
// =======================

// Parse JSON
app.use(express.json());

// Parse cookies
app.use(cookieParser());


cloudinary.cloudinaryConnect();

// Handle file uploads (for Cloudinary etc.)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Allow frontend (CORS)
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

// =======================
// 🚏 Routes
// =======================
app.use("/api/v1/auth", auth);
app.use("/api/v1/category", category);
app.use("/api/v1/course", course);
// app.use("/api/v1/payment", payment);
app.use("/api/v1/profile", profile);
app.use("/api/v1/resetPassword", resetPassword);
app.use("/api/v1/course", reviewAndRating);
app.use("/api/v1/course", sectionAndSubsection);

// =======================
// 🧠 Root Test Route
// =======================
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "✅ StudyNotion Server is Running Smoothly 🚀",
  });
});

// =======================
// 🚀 Start Server
// =======================
app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
