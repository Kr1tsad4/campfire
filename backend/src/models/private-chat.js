const mongoose = require("mongoose");

const privateChatSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    index: true, 
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
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

module.exports = mongoose.model("PrivateChat", privateChatSchema);
