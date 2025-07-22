const { saveMessage: savePartyMessage, getMessagesByParty } = require("../services/chat-service");
const { saveMessage: savePrivateMessage, getChatHistory } = require("../services/private-chat-service");

const chatSocketHandler = (io, socket) => {
  socket.on("join-party", async (partyId) => {
    socket.join(partyId);
    const oldMessages = await getMessagesByParty(partyId); 
    socket.emit("old-messages", oldMessages);
  });

  socket.on("send-message", async ({ partyId, user, message }) => {
    const saved = await savePartyMessage({ partyId, user, message });
    io.to(partyId).emit("receive-message", saved);
  });


  socket.on("join-private-room", async ({ userAId, userBId }) => {
    const roomId = [userAId, userBId].sort().join("_");
    socket.join(roomId);

    const oldMessages = await getChatHistory(userAId, userBId);
    socket.emit("old-private-messages", oldMessages);
  });

  socket.on("send-private-message", async ({ sender, recipient, message }) => {
    const saved = await savePrivateMessage({ senderId: sender, receiverId: recipient, message });

    const roomId = [sender, recipient].sort().join("_");
    io.to(roomId).emit("receive-private-message", saved);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

module.exports = { chatSocketHandler };

