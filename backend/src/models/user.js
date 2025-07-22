const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModelSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    penName: {
      type: String,
      require: true,
      trim: true,
    },
    firstName: {
      type: String,
      require: true,
      trim: true,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    dob: {
      type: Date,
      require: true,
    },
    aboutMe: {
      type: String,
      trim: true,
      default: "",
    },
    interestedTag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserModelSchema);
