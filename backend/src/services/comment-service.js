const Comment = require("../models/comment");
const Post = require("../models/post");
const createError = require("http-errors");

const findAll = async () => {
  return await Comment.find()
    .select("-__v")
    .populate({
      path: "commentedBy",
      select: "-password -__v -createdAt -updatedAt",
    })
    .populate({
      path: "commentToPost",
      select: "-__v",
    });
};

const create = async (post) => {
  const { commentedBy, content, commentToPost } = post;

  const createdComment = await Comment.create({
    commentedBy,
    content,
    commentToPost,
  });
  await Post.findByIdAndUpdate(
    commentToPost,
    { $push: { comments: createdComment._id } },
    { new: true }
  );
  return createdComment;
};

const deleteById = async (commentId) => {
  const existingComment = await Comment.findById(commentId);
  if (existingComment) {
    await Comment.deleteOne(existingComment);
  }
};
module.exports = { findAll, create,deleteById };
