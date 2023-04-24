const Users = require('../service/schemas/users');

const checkUser = async(email) => {
  return Users.findOne(email);
};

const addUser = async(newUser) => {
  return Users.create(newUser);
};

const recordToken = async(id, token) => {
  return Users.findByIdAndUpdate(id, {token});
};



module.exports = {
  checkUser,
  addUser,
  recordToken
};