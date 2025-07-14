const { saveMessage,getMessagesByParty } = require("../services/chat-service");
const chatSocketHandler = (io, socket) => {
  socket.on("join-party", async (partyId) => {
    socket.join(partyId);
    const oldMessages = await getMessagesByParty(partyId); 
    socket.emit("old-messages", oldMessages);
  });

  socket.on("send-message", async ({ partyId, user, message }) => {
    const saved = await saveMessage({ partyId, user, message });
    io.to(partyId).emit("receive-message", saved);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};

module.exports = { chatSocketHandler };
