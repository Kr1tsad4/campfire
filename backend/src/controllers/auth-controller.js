const asyncHandler = require("express-async-handler");
const authService = require("../services/auth-service");

const userLogin = asyncHandler(async (req, res) => {
  const users = await authService.login(req.body);
  res.status(200).json(users);
});

module.exports = {
  userLogin,
};
