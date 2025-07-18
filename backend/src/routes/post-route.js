const express = require("express");
const router = express.Router();
const {
  getAllPost,
  getPostById,
  createPost,
  createComment,
} = require("../controllers/post-controller");

router.route("/").get(getAllPost);
router.route("/:id").get(getPostById);
router.route("/").post(createPost);
router.route("/comment").post(createComment);

module.exports = router;
