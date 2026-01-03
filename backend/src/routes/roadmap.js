const express = require("express");
const generateRoadmap = require("../utils/generateRoadmap");

const router = express.Router();

router.post("/", (req, res) => {
  const { role, skills } = req.body;

  if (!role) {
    return res.status(400).json({ error: "Role is required" });
  }

  const roadmap = generateRoadmap(role, skills);

  return res.json({ roadmap });
});

module.exports = router;
