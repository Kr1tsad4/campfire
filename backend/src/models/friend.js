  const mongoose = require("mongoose");

  const friendSchema = new mongoose.Schema(
    {
      fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      toUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
      },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Friend", friendSchema);
