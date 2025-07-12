const bcrypt = require('bcryptjs')
const User = require("../models/user");
const createError = require("http-errors");

const login = async (data) => {
  const {username, password} = data;
  const user = await User.findOne({ username: username});
  if (!user) {
    throw createError(404, `User not found.`);
  }
  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if(passwordIsValid) {
    return user;
  }
  return {message: 'Invalid password.'};
};

module.exports = { login };
