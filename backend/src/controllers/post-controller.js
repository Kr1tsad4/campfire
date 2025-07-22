const postService = require("../services/post-service");
const commentService = require("../services/comment-service");

const asyncHandler = require("express-async-handler");

const getAllPost = asyncHandler(async (req, res) => {
  const posts = await postService.findAll();
  return res.status(200).json(posts);
});

const getPostById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const post = await postService.findById(id);
  return res.status(200).json(post);
});

const createPost = asyncHandler(async (req, res) => {
  const createdPost = await postService.create(req.body);
  return res.status(201).json(createdPost);
});

const getAllComment =  asyncHandler(async (req, res) => {
  const comments = await commentService.findAll();
  return res.status(200).json(comments);
});
const createComment = asyncHandler(async (req, res) => {
  const createdComment = await commentService.create(req.body);
  return res.status(201).json(createdComment);
});

const deleteComment = asyncHandler(async (req, res) => {
  await commentService.deleteById(req.params.id);
  res.status(200).json({ message: "Comment deleted successfully." });
});


const deletePost = asyncHandler(async (req, res) => {
  await postService.deleteById(req.params.id);
  return res.status(200).json({ message: "Post deleted successfully." });
});

module.exports = {
  getAllPost,
  getPostById,
  createPost,
  createComment,
  deletePost,
  getAllComment,
  deleteComment
};
