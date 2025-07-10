const mongoose = require("mongoose");

const partySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
    ],
    description: {
      type: String,
      trim: true,
      default: null,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        default: null,
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Party", partySchema);
