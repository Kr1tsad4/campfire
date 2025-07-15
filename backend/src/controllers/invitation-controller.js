const asyncHandler = require("express-async-handler");
const invitationService = require("../services/invitation-service");

const getAllInvitation = asyncHandler(async (req, res) => {
  const invitations = await invitationService.findAll(req.params.id);
  res.status(200).json(invitations);
});
const getInvitationById = asyncHandler(async (req, res) => {
  const invitation = await invitationService.findById(req.params.id);
  res.status(200).json(invitation);
});
const createInvitation = asyncHandler(async (req, res) => {
  const invitation = await invitationService.create(req.body);
  res.status(201).json(invitation);
});
const updateInvitation = asyncHandler(async (req, res) => {
  const invitation = await invitationService.update(req.params.id, req.body);
  res.status(200).json(invitation);
});
module.exports = {
  getAllInvitation,
  getInvitationById,
  createInvitation,
  updateInvitation,
};
