const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const users = new Schema({
  name:{
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null
  }
}, {timestamps: true}
);

users.methods.hashPassword = async function(password) {
  this.password = await bcrypt.hash(password, 10);
};

users.methods.comperePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};



const Users = mongoose.model('user', users);

module.exports = Users;