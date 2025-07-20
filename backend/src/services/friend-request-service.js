const FriendRequest = require("../models/friend-request");
const createError = require("http-errors");
const User = require("../models/user");

const create = async (requestData) => {
  const { fromUser, toUser } = requestData;
  const createdRequest = await FriendRequest.create({ fromUser, toUser });
  return await createdRequest.populate({
    path: "fromUser",
    select: "_id penName",
  });
};

const getRequests = async (userId) => {
  return await FriendRequest.find({ toUser: userId })
    .populate({
      path: "fromUser",
      select: "_id penName",
    })
    .populate({ path: "toUser", select: "_id penName" });
};

const acceptRequest = async (requestId) => {
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

module.exports = { create, getRequests, deleteById, acceptRequest };
