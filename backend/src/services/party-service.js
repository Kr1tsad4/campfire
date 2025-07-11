const Party = require("../models/party");
const createError = require("http-errors");

const findAll = async () => {
  return await Party.find().select("-__v");
};

const findById = async (id) => {
  const existingParty = await Party.findById(id).select("-__v");
  if (!existingParty) {
    throw createError(404, `Party not found.`);
  }
  return existingParty;
};
const create = async (party) => {
  const { name, description, ownerId,date,startTime,endTime,tags,status } = party;
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
  const { name, ownerId, members, description, start, end, tags, status } =
    party;

  const existingParty = await Party.findById(id).select("-__v");
  if (!existingParty) {
    throw createError(404, `Party not found.`);
  }
  if (name !== undefined) existingParty.name = name;
  if (ownerId !== undefined) existingParty.ownerId = ownerId;
  if (members !== undefined) existingParty.members = members;
  if (description !== undefined) existingParty.description = description;
  if (start !== undefined) existingParty.start = start;
  if (end !== undefined) existingParty.end = end;
  if (tags !== undefined) existingParty.tags = tags;
  if (status !== undefined) existingParty.status = status;

  const updatedParty = await existingParty.save();
  return updatedParty;
};

const deleteById = async (id) => {
  const existingParty = await Party.findById(id);
  if (!existingParty) {
    throw createError(404, `Party not found.`);
  }
  await Party.deleteOne(existingParty._id);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
