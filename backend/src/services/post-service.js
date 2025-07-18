const Post = require("../models/post");
const createError = require("http-errors");

const findAll = async () => {
  return await Post.find()
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

  const createdPost = await Post.create({ content, authorId });
  return createdPost;
};
module.exports = { findAll, findById, create };
