const express = require("express");
const {
  createRequestFriend,
  getUserRequests,
  getUserRequestsByFromUser,
  acceptUserRequest,
  deleteUserRequest,
  deleteFriendRequest,
} = require("../controllers/friend-controller");

const router = express.Router();

router.get("/:id", getUserRequests);
router.get("/fromUser/:id", getUserRequestsByFromUser);
router.post("/", createRequestFriend);
router.put("/accept", acceptUserRequest);
router.delete("/:id", deleteUserRequest);
router.post("/delete", deleteFriendRequest);

module.exports = router;
