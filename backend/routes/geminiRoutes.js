const express = require("express");
const { generateProfiles } = require("../services/geminiService");

const router = express.Router();

router.get("/generateProfiles", async (req, res) => {
  try {
    const profiles = await generateProfiles();
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate profiles" });
  }
});

module.exports = router;
