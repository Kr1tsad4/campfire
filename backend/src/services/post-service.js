const Post = require("../models/post");
const Comment = require("../models/comment");

const createError = require("http-errors");

const findAll = async () => {
  return await Post.find()
    .sort({ createdAt: -1 })
    .select("-__v")
    .populate({
      path: "authorId",
      select: "_id penName interestedTag",
    })
    .populate({
      path: "comments",
      select: "-__v -commentToPost",
      populate: {
        path: "commentedBy",
        select: "_id penName interestedTag",
      },
    });
};

const findById = async (id) => {
  const existingPost = await Post.findById(id)
    .select("-__v")
    .populate({
      path: "authorId",
      select: "_id penName interestedTag",
    })
    .populate({
      path: "comments",
      select: "-__v -commentToPost",
      populate: {
        path: "commentedBy",
        select: "_id penName interestedTag",
      },
    });

  if (!existingPost) {
    throw createError(404, `Post not found.`);
  }
  return existingPost;
};

const create = async (post) => {
  const { content, authorId } = post;

  if (!content.trim()) {
    throw create(400, "Content is required.");
  }
  const createdPost = await Post.create({ content, authorId });
  return createdPost;
};

const deleteById = async (id) => {
  const existingPost = await Post.findById(id);

  if (!existingPost) {
    throw createError(404, "Post not found.");
  }
  await Comment.deleteMany({ commentToPost: id });
  await Post.findByIdAndDelete(id);
};
module.exports = { findAll, findById, create, deleteById };
