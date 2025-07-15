const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const invitationSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    partyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Party",
      default: null,
    },
    status: {
      type: Number, // 0 stand for pending, 1 accepted, 2 declined
      required: true,
      default: 0,
    },
    responseTimeStamp: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
