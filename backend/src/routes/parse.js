// backend/src/routes/parse.js
const express = require("express");
const axios = require("axios");
const ResumeData = require("../models/ResumeData");
const authMiddleware=require("../middleware/authMiddleware")

const router = express.Router();

router.post("/",authMiddleware,async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Call Python ML service
    const response = await axios.post(process.env.ML_SERVICE_URL + "/analyze"
, {
      text,
    });
    const {skills, role}=response.data;
   
    await ResumeData.create({
      userId:req.user.userid,
      originalText: text,
      skills,
      role,
    });

    return res.json(response.data);
  } catch (error) {
    console.error("Error calling ML service:", error.message);
    return res.status(500).json({ error: "ML service error" });
  }
});

module.exports = router;
