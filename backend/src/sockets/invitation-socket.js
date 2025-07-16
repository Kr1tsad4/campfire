const { findAll, findById, create, update, deleteInvitation } = require('../services/invitation-service');
const invitationSocketHandler = (io, socket) => {
  socket.on('inviteUser', async (senderId, recipientId, partyId) => {
    try{
      const result = await create({senderId, recipientId, partyId});
    } catch (err) {
      console.log(err);
    }
  })
}

module.exports = {invitationSocketHandler};