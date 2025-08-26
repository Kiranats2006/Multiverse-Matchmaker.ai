const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String, // 'user' or hero's name
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const matchSchema = new mongoose.Schema({
  username: { type: String, required: true },
  hero: { type: String, required: true },
  messages: [
    {
      sender: String,
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Match", matchSchema);
