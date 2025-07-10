const partyService = require("../services/party-service");
const asyncHandler = require("express-async-handler");

const getParty = asyncHandler(async (req, res) => {
  const party = await partyService.findAll();
  return res.status(200).json(party);
});

const getPartyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const party = await partyService.findById(id);
  return res.status(200).json(party);
});
const createParty = asyncHandler(async (req, res) => {

});
const updateParty = asyncHandler(async (req, res) => {

});

const deleteParty = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  await partyService.deleteById(id);
  return res.status(200).json({ message: "Party deleted successfully." });
});

module.exports = {
  getParty,
  getPartyById,
  createParty,
  updateParty,
  deleteParty,
};
