// backend/src/routes/uploadPdf.js
const express = require("express");
const multer = require("multer");
const ResumeData = require("../models/ResumeData");
const authMiddleware = require("../middleware/authMiddleware");


const axios = require("axios");
const { PDFExtract } = require("pdf.js-extract");

const router = express.Router();

// -------------------- MULTER SETUP --------------------
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
  },
});

// -------------------- ROUTE --------------------
router.post("/",authMiddleware, upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // ---------- Extract PDF text using pdf.js-extract ----------
    const pdfExtract = new PDFExtract();

    const data = await pdfExtract.extractBuffer(req.file.buffer);

    let text = "";
    data.pages.forEach((page) => {
      page.content.forEach((item) => {
        if (item.str) text += item.str + " ";
      });
    });

    if (!text.trim()) {
      return res.status(400).json({ error: "PDF contained no readable text" });
    }

    // ---------- Call ML Service ----------
    const mlResp = await axios.post(process.env.ML_SERVICE_URL + "/analyze"
, { text });
    const { skills, role } = mlResp.data;

    // Save to database
    await ResumeData.create({
      userId:req.user.userId,
      originalText: text,
      skills,
      role,
    });

    // Send response to frontend
    return res.json({
      originalTextSnippet: text.slice(0, 800),
      skills,
      role,
    });


  } catch (err) {
    console.error("Error in uploadPdf:", err.message || err);

    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: "Failed to process PDF" });
  }
});

module.exports = router;
