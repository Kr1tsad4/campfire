const Tag = require("../models/tag");
const createError = require("http-errors");

const findAll = async () => {
  return await Tag.find().select("-__v");
};

const findById = async (id) => {
  const existingTag = await Tag.findById(id).select("-__v");
  if (!existingTag) {
    throw createError(404, `Tag not found.`);
  }
  return existingTag;
};

const create = async (tag) => {
  const { name } = tag;
  const existingTagName = await Tag.findOne({ name: name });

  if (!name) {
    throw createError(400, `Tag name is required.`);
  }
  if (existingTagName) {
    throw createError(400, `Tag name is already used.`);
  }
  const newTag = await Tag.create(tag);
  const tagObj = newTag.toObject();
  delete tagObj.__v;
  return tagObj;
};

const update = async (id, tag) => {
  const existingTag = await Tag.findById(id).select("-__v");
  const { name } = tag;
  const existingTagName = await Tag.findOne({ name: name });
  if (!existingTag) {
    throw createError(404, `Tag not found.`);
  }
  if (existingTag.name === name) {
    throw createError(400, `Name must be different from the current name.`);
  }
  if (existingTagName) {
    throw createError(400, `Tag name is already used.`);
  }

  existingTag.name = name;
  const updatedTag = await existingTag.save();
  return updatedTag;
};

const deleteById = async (id) => {
  const existingTag = await Tag.findById(id);
  if (!existingTag) {
    throw createError(404, `Tag not found.`);
  }
  await Tag.deleteOne(existingTag._id);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  deleteById,
};
