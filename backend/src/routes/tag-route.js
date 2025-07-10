const express = require("express");
const router = express.Router();

const {
  getTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
} = require("../controllers/tag-controller");

router.route("/").get(getTags);
router.route("/:id").get(getTagById);
router.route("/").post(createTag);
router.route("/:id").put(updateTag);
router.route("/:id").delete(deleteTag);

module.exports = router;
