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

};
const update = async(id,party) =>{

}


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
