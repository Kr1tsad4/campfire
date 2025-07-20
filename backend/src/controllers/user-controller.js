const asyncHandler = require("express-async-handler");
const userServices = require("../services/user-service");
const getUsers = asyncHandler(async (req, res) => {
  const users = await userServices.findAll();
  res.status(200).json(users);
});
const getUserById = asyncHandler(async (req, res) => {
  const user = await userServices.findById(req.params.id);
  res.status(200).json(user);
});
const createUser = asyncHandler(async (req, res) => {
  const user = await userServices.create(req.body);
  res.status(201).json(user);
});
const updateUser = asyncHandler(async (req, res) => {
  const user = await userServices.update(req.params.id, req.body);
  res.status(200).json(user);
});
const deleteUser = asyncHandler(async (req, res) => {
  await userServices.deleteUser(req.params.id);
  return res.status(200).json({ message: "User deleted successfully." });
});


module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
