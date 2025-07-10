const express = require("express");
const router = express.Router();
const {
  getParty,
  getPartyById,
  createParty,
  updateParty,
  deleteParty,
} = require("../controllers/party-controller");

router.route("/").get(getParty);
router.route("/:id").get(getPartyById);
router.route("/").post(createParty);
router.route("/:id").put(updateParty);
router.route("/:id").delete(deleteParty);
module.exports = router;
