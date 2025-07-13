const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const findAll = async () => {
  return await User.find();
};

const findById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw createError(404, `User not found with id ${id}.`);
  }
  return user;
};

const create = async (userData) => {
  const { username, firstName, lastName, email, password, dob, interestedTag } =
    userData;

  const existingUser = await User.findOne({ username: username });
  if (existingUser) throw createError(409, `Username has been used`);
  const hashedPassword = bcrypt.hashSync(password);

  const newUser = await User.create({
    username,
    penName: username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    dob,
    interestedTag,
  });

  return newUser;
};
const update = async (id, userData) => {
  const {
    username,
    penName,
    firstName,
    lastName,
    email,
    password,
    newPassword,
    dob,
    interestedTag,
    aboutMe,
  } = userData;

  let isUpdated = false;
  const user = await User.findById(id);
  if (!user) throw createError(404, `User not found with id ${id}.`);
  console.log(user.aboutMe);
  const updateData = {};
  if (username && user.username !== username) {
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) throw createError(409, `Username has been used.`);
    updateData.username = username;
    isUpdated = true;
  }
  if (penName && user.penName !== penName) {
    updateData.penName = penName;
    isUpdated = true;
  }
  if (firstName && user.firstName !== firstName) {
    updateData.firstName = firstName;
    isUpdated = true;
  }
  if (lastName && user.lastName !== lastName) {
    updateData.lastName = lastName;
    isUpdated = true;
  }
  if (email && user.email !== email) {
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) throw createError(409, `Email has been used.`);
    updateData.email = email;
    isUpdated = true;
  }
  if (password && newPassword) {
    if (!bcrypt.compareSync(password, user.password)) {
      throw createError(400, "Invalid Password");
    }
    if (bcrypt.compareSync(newPassword, user.password)) {
      throw createError(400, "The password must be different.");
    }
    const hashedPassword = bcrypt.hashSync(newPassword);
    updateData.password = hashedPassword;
    isUpdated = true;
  }
  if (dob && user.dob !== dob) {
    updateData.dob = dob;
    isUpdated = true;
  }
  if (interestedTag !== undefined) {
    updateData.interestedTag = interestedTag;
    isUpdated = true;
  }
  if (user.aboutMe !== aboutMe) {
    updateData.aboutMe = aboutMe;
    isUpdated = true;
  }
  console.log(updateData);
  if (!isUpdated) throw createError(400, "Does not have any different data.");
  const updatedUser = await User.findByIdAndUpdate(id, updateData);
  return updatedUser;
};

const deleteUser = async (id) => {
  const existingUser = await User.findById(id);
  if (!existingUser) throw createError(404, `User not found with id ${id}.`);
  await User.deleteOne(existingUser._id);
};

module.exports = { findAll, findById, create, update, deleteUser };
