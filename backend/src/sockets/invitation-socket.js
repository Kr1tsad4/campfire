const { findAll, findById, create, update, deleteInvitation } = require('../services/invitation-service');
const invitationSocketHandler = (io, socket) => {
  socket.on('inviteUser', async (senderId, recipientId, partyId) => {
    try{ 
      const invite = await create({senderId, recipientId, partyId});
      io.to(recipientId).emit('new-invite', invite);
    } catch (err) {
      console.log(err);
    }
  })
  socket.on('join-invitation', async (userId) => {
    socket.join(userId);
  })
  
}

module.exports = {invitationSocketHandler};