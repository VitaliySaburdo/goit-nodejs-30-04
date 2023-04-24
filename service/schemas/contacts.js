const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const contacts = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
  },
  { versionKey: false }
);


const Contacts = mongoose.model('contact', contacts);

module.exports = Contacts;
