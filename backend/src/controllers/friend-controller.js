const asyncHandler = require("express-async-handler");
const friendService = require("../services/friend-service");

const createRequestFriend = asyncHandler(async (req, res) => {
  const newRequest = await friendService.create(req.body);
  return res.status(201).json(newRequest);
});

const getUserRequests = asyncHandler(async (req, res) => {
  const userRequest = await friendService.getRequests(req.params.id);
  return res.status(200).json(userRequest);
});
const getUserRequestsByFromUser = asyncHandler(async (req, res) => {
  const userRequest = await friendService.getRequestsByFromUser(req.params.id);
  return res.status(200).json(userRequest);
});

const acceptUserRequest = asyncHandler(async (req, res) => {
  const { requestId } = req.body;
  await friendService.acceptRequest(requestId);
  res.status(200).json({ message: "Friend request accepted" });
});

const deleteUserRequest = asyncHandler(async (req, res) => {
  await friendService.deleteById(req.params.id);
  return res.status(200).json({ message: "Request deleted successfully." });
});
const deleteFriendRequest = asyncHandler(async (req, res) => {
  await friendService.deleteFriend(req.body);
  return res.status(200).json({ message: "Request deleted successfully." });
});

module.exports = {
  createRequestFriend,
  getUserRequests,
  getUserRequestsByFromUser,
  acceptUserRequest,
  deleteUserRequest,
  deleteFriendRequest,
};
