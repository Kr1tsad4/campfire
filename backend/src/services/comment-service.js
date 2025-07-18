const Comment = require("../models/comment");
const Post = require("../models/post");
const createError = require("http-errors");

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
module.exports = { create };
