const asyncHandler = require("express-async-handler");
const userServices = require("../services/user-service");
const friendRequestService = require("../services/friend-request-service");
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

const createRequestFriend = asyncHandler(async (req, res) => {
  const newRequest = await friendRequestService.create(req.body);
  return res.status(201).json(newRequest);
});


const getUserRequests = asyncHandler(async (req, res) => {
  const userRequest = await friendRequestService.getRequests(req.params.id);
  return res.status(200).json(userRequest);
});

const acceptUserRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.body; 
  await friendRequestService.acceptRequest(requestId);
  res.status(200).json({ message: "Friend request accepted" });
});

const deleteUserRequest = asyncHandler(async (req, res) => {
  await friendRequestService.deleteById(req.params.id);
  return res.status(200).json({ message: "Request deleted successfully." });
});
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createRequestFriend,
  getUserRequests,
  acceptUserRequest,
  deleteUserRequest,
};
