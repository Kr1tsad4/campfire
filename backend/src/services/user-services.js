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
  const { username, firstname, lastname, email, password, dob, interestedTag } =
    userData;

  const newUser = await User.create({
    username,
    firstname,
    lastname,
    email,
    password,
    dob,
    interestedTag,
  });

  return newUser;
};

const deleteUser = async (id) => {
  const existingUser = await User.findById(id);
  if (!existingUser) throw createError(404, `User not found with id ${id}.`);
  await User.deleteOne(existingUser._id);
};

// const update = async (id, userData) => {
//   const existingUser = await User.findById(id);
//   if (!existingUser) throw createError(404, `User not found with id ${id}`);

//   const { username, firstname, lastname, email, password, dob, interestedTag } =
//     userData;

//   const newUser = await User.create({
//     username,
//     firstname,
//     lastname,
//     email,
//     password,
//     dob,
//     interestedTag,
//   });

//   const existingUsername = await User.findOne({ username: username });
//   if (!existingUsername) throw createError(404, `Username has been used.`);

//   return newUser;
// };

module.exports = { findAll, findById, create, deleteUser };
