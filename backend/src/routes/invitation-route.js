const express = require("express");
const {
  getAllInvitation,
  getInvitationById,
  createInvitation,
  updateInvitation,
  deleteInvitation,
} = require("../controllers/invitation-controller");

const router = express.Router();

router.get("/:id", getAllInvitation);
router.post("/", createInvitation);
router.put("/", updateInvitation);
router.delete("/", deleteInvitation);

module.exports = router;
