const {
  create,
  getRequests,
  getRequestsByFromUser,
  acceptRequest,
  deleteById,
  deleteFriend,
} = require("../services/friend-service");
const friendSocketHandler = (io, socket) => {
  socket.on("friend-request", async (senderId, recipientId) => {
    try {
      // const invite = await create({ senderId, recipientId });
      io.to(recipientId).emit("new-request");
    } catch (err) {
      console.log(err);
    }
  });
  socket.on("join-friend", async (userId) => {
    socket.join(userId);
  });
};

module.exports = { invitationSocketHandler };
