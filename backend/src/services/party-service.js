const Party = require("../models/party");
const Invitation = require("../models/invitation");
const createError = require("http-errors");

const findAll = async () => {
  return await Party.find()
    .populate({
      path: "members",
      select: "-password -__v -createdAt -updatedAt",
    })
    .select("-__v");
};

const findById = async (id) => {
  const existingParty = await Party.findById(id)
    .populate({
      path: "members",
      select: "-password -__v -createdAt -updatedAt",
    })
    .select("-__v");
    
  if (!existingParty) {
    throw createError(404, `Party not found.`);
  }
  return existingParty;
};
const create = async (party) => {
  const { name, description, ownerId, date, startTime, endTime, tags, status } =
    party;
  if (!name) {
    throw createError(400, `Name is required.`);
  }
  const newParty = {
    name,
    ownerId,
    members: [ownerId],
    description,
    date,
    startTime,
    endTime,
    tags,
    status,
  };
  const createdParty = await Party.create(newParty);
  return createdParty;
};

const update = async (id, party) => {
  const {
    name,
    ownerId,
    members,
    description,
    startTime,
    endTime,
    date,
    tags,
    status,
  } = party;

  const existingParty = await Party.findById(id).select("-__v");
  if (!existingParty) {
    throw createError(404, `Party not found.`);
  }
  if (name !== undefined) existingParty.name = name;
  if (ownerId !== undefined) existingParty.ownerId = ownerId;
  if (members !== undefined) existingParty.members = members;
  if (description !== undefined) existingParty.description = description;
  if (startTime !== undefined) existingParty.startTime = startTime;
  if (endTime !== undefined) existingParty.endTime = endTime;
  if (tags !== undefined) existingParty.tags = tags;
  if (date !== undefined) existingParty.date = date;
  if (status !== undefined) existingParty.status = status;

  const updatedParty = await existingParty.save();
  return updatedParty;
};

const deleteById = async (id) => {
  const existingParty = await Party.findById(id);
  if (!existingParty) {
    throw createError(404, `Party not found.`);
  }
  const Invitations = await Invitation.deleteMany({ partyId: id });
  await Party.deleteOne(existingParty._id);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
