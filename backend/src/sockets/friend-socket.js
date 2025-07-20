const userService = require("../services/user-service");
const friendRequestService = require("../services/friend-request-service");

const friendSocketHandler = (io, socket) => {
  socket.on("join-room", (userId) => {
    socket.join(userId);
  });

  socket.on("send-request", async ({ fromUser, toUser }) => {
    try {
      const newRequest = await friendRequestService.create({
        fromUser,
        toUser,
      });

      io.to(toUser).emit("receive-request", newRequest);
    } catch (error) {
      console.log("Error sending request:", error);
    }
  });

  socket.on("get-requests", async (userId) => {
    try {
      const requests = await friendRequestService.getUserRequests(userId);
      socket.emit("requests-data", requests);
    } catch (error) {
      console.log("Error getting requests:", error);
    }
  });

  socket.on("reject-request", async ({ userId, requestId }) => {
    try {
      await friendRequestService.deleteById(requestId);
      const updatedRequests = await friendRequestService.getUserRequests(
        userId
      );
      socket.emit("requests-data", updatedRequests);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("accept-request", async ({ userId, requestId }) => {
    try {
      await friendRequestService.acceptRequest(userId, requestId);
      const updatedRequests = await friendRequestService.getUserRequests(
        userId
      );
      socket.emit("requests-data", updatedRequests);
    } catch (error) {
      console.log("Error accepting request:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
};

module.exports = { friendSocketHandler };
