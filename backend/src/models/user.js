const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModelSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
      trim: true,
    },
    firstname: {
      type: String,
      require: true,
      trim: true,
    },
    lastname: {
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
    interestedTag: {
      type: Array,
      trim: true,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", UserModelSchema);

export default UserModel;
