const express = require("express");
const Match = require("../models/match");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, hero } = req.body;
  try {
    const existing = await Match.findOne({ username, hero });
    if (existing) return res.json(existing);

    const match = new Match({ username, hero, messages: [] });
    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: "Error saving match" });
  }
});

router.get("/:username", async (req, res) => {
  try {
    const matches = await Match.find({ username: req.params.username });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: "Error fetching matches" });
  }
});

router.post("/message", async (req, res) => {
  const { username, hero, sender, text } = req.body;
  try {
    const match = await Match.findOne({ username, hero });
    if (!match) return res.status(404).json({ error: "Match not found" });

    match.messages.push({ sender, text, timestamp: new Date() });
    await match.save();
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: "Error sending message" });
  }
});


// ✅ NEW: fetch messages between a user and hero
router.get("/messages/:username/:hero", async (req, res) => {
  try {
    const { username, hero } = req.params;

    // Decode hero in case of spaces (Tony%20S. → Tony S.)
    const heroName = decodeURIComponent(hero);

    const match = await Match.findOne({ username, hero: heroName });

    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }

    res.json(match.messages || []);
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Error fetching messages" });
  }
});

module.exports = router;
