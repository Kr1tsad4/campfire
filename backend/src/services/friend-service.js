const Friend = require("../models/friend");
const createError = require("http-errors");

const create = async (requestData) => {
  const { fromUser, toUser, status } = requestData;
  const existPending = await Friend.findOne({ fromUser:toUser, toUser:fromUser});
  if(existPending) {
    await Friend.create({ fromUser, toUser, status: "accepted" });
    await Friend.create({ fromUser:toUser, toUser:fromUser, status: "accepted" });
    await Friend.findByIdAndDelete(existPending._id);
    return {message: "The pending is exist, auto accept", existPending};
  }
  const createdRequest = await Friend.create({ fromUser, toUser, status });
  return await createdRequest.populate({
    path: "fromUser",
    select: "_id penName",
  });
};

const getRequests = async (userId) => {
  return await Friend.find({ toUser: userId })
    .populate({
      path: "fromUser",
      select: "_id penName",
    })
    .populate({ path: "toUser", select: "_id penName" });
};

const getRequestsByFromUser = async (userId) => {
  return await Friend.find({ fromUser: userId })
    .populate({
      path: "fromUser",
      select: "_id penName",
    })
    .populate({ path: "toUser", select: "_id penName" });
};

const acceptRequest = async (requestId) => {
  const request = await Friend.findById(requestId);
  console.log("Friend found:", request);
  if (!request) throw createError(404, "Friend request not found");

  const fromUser = request.fromUser;
  const toUser = request.toUser;

  const createdFromTo = await Friend.create({ fromUser, toUser, status: "accepted" });
  const createdToFrom = await Friend.create({ fromUser:toUser, toUser:fromUser, status: "accepted" });
  // await User.findByIdAndUpdate(fromUserId, {
  //   $addToSet: { friends: toUserId },
  // });
  // await User.findByIdAndUpdate(toUserId, {
  //   $addToSet: { friends: fromUserId },
  // });

  await Friend.findByIdAndDelete(requestId);
};

const deleteById = async (requestId) => {
  const existingRequest = await Friend.findById(requestId);
  if (existingRequest) {
    await Friend.findByIdAndDelete(requestId);
  }
};
const deleteFriend = async (requestData) => {

  const { user1, user2 } = requestData;
  const existingRequest_1 =  await Friend.findOne({ fromUser:user1, toUser:user2});
  const existingRequest_2 =  await Friend.findOne({ fromUser:user2, toUser:user1});
  if (existingRequest_1) await Friend.findByIdAndDelete(existingRequest_1._id);
  if (existingRequest_2) await Friend.findByIdAndDelete(existingRequest_2._id);
  return { message: "Friend deleted successfully" };
};

module.exports = { create, getRequests, getRequestsByFromUser, acceptRequest, deleteById, deleteFriend };
