const Chat = require("../models/chat");
const saveMessage = async ({ partyId, user, message }) => {
  return await Chat.create({ partyId, user, message });
};

const getMessagesByParty = async (partyId) => {
  return await Chat.find({ partyId }).sort({ timestamp: 1 });
};

module.exports = { saveMessage, getMessagesByParty };
