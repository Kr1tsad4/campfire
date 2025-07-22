const PrivateChat = require("../models/private-chat");

function generateRoomId(userId1, userId2) {
  return [userId1, userId2].sort().join("_");
}

const saveMessage = async ({ senderId, receiverId, message }) => {
  const roomId = generateRoomId(senderId, receiverId);
  const privateChat = new PrivateChat({
    roomId,
    sender: senderId,
    message,
  });
  return await privateChat.save();
};

const getChatHistory = async (userId1, userId2) => {
  const roomId = generateRoomId(userId1, userId2);
  return await PrivateChat.find({ roomId })
    .sort({ timestamp: 1 })
    .populate("sender", "username");
};

module.exports = {
  generateRoomId,
  saveMessage,
  getChatHistory,
};
