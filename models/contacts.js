const Contacts = require('../service/schemas/contacts');


const listContacts = async (param = {}, skip, limit) => {
  return await Contacts.find(param, '-createdAt -updatedAt', {skip: skip, limit: limit}).populate('owner', '_id name');
}

const getContactById = async (contactId) => {
  return await Contacts.findById(contactId);
}

const getContact = async (param) => {
  return await Contacts.findOne(param);
}

const removeContact = async (contactId) => {
  return await Contacts.findByIdAndRemove(contactId);
}

const addContact = async (newContact) => {
  return await Contacts.create(newContact);
}

const updateContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate(contactId, body, { new: true });
}

const updateStatusContact = async (contactId, body) => {
  return Contacts.findByIdAndUpdate(contactId, body, { new: true });
}

module.exports = {
  listContacts,
  getContact,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
