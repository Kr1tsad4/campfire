const express = require("express");
const router = express.Router();
const {
  getAllPost,
  getPostById,
  createPost,
  createComment,
  deletePost,
  getAllComment,
  deleteComment,
} = require("../controllers/post-controller");

router.route("/comment").get(getAllComment);
router.route("/comment").post(createComment);
router.route("/comment/:id").delete(deleteComment);
router.route("/").get(getAllPost);
router.route("/:id").get(getPostById);
router.route("/").post(createPost);
router.route("/:id").delete(deletePost);

module.exports = router;
