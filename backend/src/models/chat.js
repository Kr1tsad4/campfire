const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  partyId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chat", chatSchema);
