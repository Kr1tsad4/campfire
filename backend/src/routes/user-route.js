const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createRequestFriend,
  getUserRequests,
  acceptUserRequest,
  deleteUserRequest
} = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.get("/friends-request/:id", getUserRequests);          
router.post("/friends-request", createRequestFriend);         
router.put("/friends-request/accept", acceptUserRequest);     
router.delete("/friends-request/:id", deleteUserRequest);  

module.exports = router;
