// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Static uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // Routes
// app.use("/api/auth", require('./routes/AuthRoutes'));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/cart", require("./routes/Cartroutes"));
// app.use("/api/orders", require("./routes/OrderRoutes"));
// app.use("/api/wishlist", require("./routes/Wishlistroutes"));

// // Health check
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "SINGAM API Running 🦁",
//     time: new Date()
//   });
// });

// // MongoDB connection
// mongoose.connect("mongodb://localhost:27017/mensfashion")
// .then(() => {
//   console.log("✅ MongoDB Connected");
// })
// .catch((err) => {
//   console.error("❌ MongoDB Error:", err);
// });

// // Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🦁 SINGAM Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require('./config/Db');

dotenv.config();

const app = express();
connectDB()
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/AuthRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/Cartroutes"));
app.use("/api/orders", require("./routes/OrderRoutes"));
app.use("/api/wishlist", require("./routes/Wishlistroutes"));

// Health check





  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🦁 SINGAM Server running on port ${PORT}`);
  });



