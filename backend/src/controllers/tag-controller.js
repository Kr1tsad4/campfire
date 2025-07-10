const tagService = require("../services/tag-service");
const asyncHandler = require("express-async-handler");

const getTags = asyncHandler(async (req, res) => {
  const tags = await tagService.findAll();
  return res.status(200).json(tags);
});

const getTagById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const tag = await tagService.findById(id);
  return res.status(200).json(tag);
});

const createTag = asyncHandler(async (req, res) => {
  const newTag = await tagService.create(req.body);
  return res.status(201).json(newTag);
});

const updateTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedTag = await tagService.update(id, req.body);
  return res.status(200).json(updatedTag);
});

const deleteTag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await tagService.deleteById(id);
  return res.status(200).json({ message: "Tag deleted successfully." });
});

module.exports = {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
};
