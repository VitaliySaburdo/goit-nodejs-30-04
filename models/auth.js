const Users = require('../service/schemas/users');

const checkUser = async(email) => {
  return Users.findOne({email});
};

const addUser = async(newUser) => {
  return Users.create(newUser);
};

module.exports = {
  checkUser,
  addUser
}