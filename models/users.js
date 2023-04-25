const Users = require("../service/schemas/users");

const checkUser = async (email) => {
  return Users.findOne(email);
};

const addUser = async (newUser) => {
  return Users.create(newUser);
};

const recordToken = async (id, token) => {
  return Users.findByIdAndUpdate(id, { token });
};

const updateSubUser = async (userId, body) => {
  return Users.findByIdAndUpdate(userId, body, { new: true });
};


module.exports = {
  checkUser,
  addUser,
  recordToken,
  updateSubUser
};
