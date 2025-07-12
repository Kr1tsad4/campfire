const express = require("express");
const { userLogin } = require('../controllers/auth-controller');

const router = express.Router();

router.post('/', userLogin);

module.exports = router;
