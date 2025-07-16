const express = require("express");
const {
  getAllInvitation,
  getUserInvitaion,
  getInvitationById,
  createInvitation,
  updateInvitation,
  deleteInvitation,
} = require("../controllers/invitation-controller");

const router = express.Router();

router.get("/", getAllInvitation);
router.get("/user/:id", getUserInvitaion);
router.get("/obj/:id", getInvitationById);
router.post("/", createInvitation);
router.put("/", updateInvitation);
router.delete("/:id", deleteInvitation);

module.exports = router;
