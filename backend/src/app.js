// backend/src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose=require("mongoose");
const parseRoute = require("./routes/parse");
const uploadPdfRoute = require("./routes/uploadPdf");
const roadmapRoute = require("./routes/roadmap");
const historyRoute = require("./routes/history");
const authRoute = require("./routes/auth");



const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/parse", parseRoute);
app.use("/api/parse_pdf", uploadPdfRoute);
app.use("/api/roadmap", roadmapRoute);
app.use("/api/history", historyRoute);
app.use("/api/auth", authRoute);
app.use("/api/auth", authRoute);




// Test route
app.get("/", (req, res) => {
  res.send("Backend server running...");
});

// Listen
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai_career")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
