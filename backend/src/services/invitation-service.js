const Invitation = require("../models/invitation");
const createError = require("http-errors");

const findAll = async () => {
  return await Invitation.find();
};

const findAllByRecipientId = async (id) => {
  return await Invitation.find({ recipientId: id });
};

const findById = async (id) => {
  const invitation = await Invitation.findById(id);
  if (!invitation) {
    throw createError(404, `Invitation not found with id ${id}.`);
  }
  return invitation;
};

const create = async (data) => {
  const invitation = await Invitation.findOne(data);
  if (invitation) throw createError(400, `Invitation already exist.`);
  const { senderId, recipientId, partyId } = data;
  const newInvitation = await Invitation.create({
    senderId,
    recipientId,
    partyId,
  });
  return newInvitation;
};

const update = async (id, data) => {
  const updatedInvitation = await Invitation.findByIdAndUpdate(id, updateData);
  return updatedInvitation;
};

const deleteInvitation = async (id) => {
  const existingInvitation = await Invitation.findById(id);
  if (!existingInvitation)
    throw createError(404, `Invitation not found with id ${id}.`);
  await Invitation.deleteOne(existingInvitation._id);
};

module.exports = { findAll, findAllByRecipientId, findById, create, update, deleteInvitation };
