const express = require("express");
const {
  getAllInvitation,
  getInvitationById,
  createInvitation,
  updateInvitation,
} = require('../controllers/invitation-controller');

const router = express.Router();

router.get('/:id', getAllInvitation);
router.post('/', createInvitation);
router.put('/', updateInvitation);

module.exports = router;
