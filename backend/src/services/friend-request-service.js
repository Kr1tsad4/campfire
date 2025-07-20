const FriendRequest = require("../models/friend-request");
const createError = require("http-errors");
const User = require("../models/user");


const create = async ({ fromUser, toUser }) => {
  const createdRequest = await FriendRequest.create({ fromUser, toUser });
  return await createdRequest.populate({
    path: "fromUser",
    select: "_id penName",
  });
};

const getUserRequests = async (userId) => {
  return await FriendRequest.find({ toUser: userId }).populate({
    path: "fromUser",
    select: "_id penName",
  });
};


const acceptRequest = async (userId, requestId) => {
  const request = await FriendRequest.findById(requestId);
  if (!request) throw createError(404, "Friend request not found");

  const fromUserId = request.fromUser;
  const toUserId = request.toUser;

  await User.findByIdAndUpdate(fromUserId, {
    $addToSet: { friends: toUserId },
  });
  await User.findByIdAndUpdate(toUserId, {
    $addToSet: { friends: fromUserId },
  });

  await FriendRequest.findByIdAndDelete(requestId);
};

const deleteById = async (requestId) => {
  const existingRequest = await FriendRequest.findById(requestId);
  if (existingRequest) {
    await FriendRequest.findByIdAndDelete(requestId);
  }
};

module.exports = { create, getUserRequests, deleteById, acceptRequest};
