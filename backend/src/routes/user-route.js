const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

module.exports = router
