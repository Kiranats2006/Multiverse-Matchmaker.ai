const express = require("express");
const { generateProfiles } = require("../services/geminiService");
const User = require("../models/user");

const router = express.Router();

router.get("/generateProfiles/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select("username bio interests");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profiles = await generateProfiles(user);
    res.json(profiles);
  } catch (error) {
    console.error(" Error in /generateProfiles route:", error);
    res.status(500).json({ error: "Failed to generate profiles" });
  }
});

module.exports = router;
