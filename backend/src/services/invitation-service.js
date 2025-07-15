const Invitation = require("../models/invitation");
const createError = require("http-errors");

const findAll = async (id) => {
  return await Invitation.find({ recipient: id, status: 0 });
};

const findById = async (id) => {
  const invitation = await Invitation.findById(id);
  if (!invitation) {
    throw createError(404, `Invitation not found with id ${id}.`);
  }
  return invitation;
};

const create = async (data) => {
  const { senderId, recipientId, partyId, status } = data;
  const newInvitation = await Invitation.create({
    senderId,
    recipientId,
    partyId,
    status: 0,
  });
  return newInvitation;
};

// data = {status, responseTimeStamp}
const update = async (id, data) => {
  const updatedInvitation = await Invitation.findByIdAndUpdate(id, updateData);
  return updatedInvitation;
};

module.exports = { findAll, findById, create, update };
