const Contacts = require('../service/schemas/contacts');


const listContacts = async () => {
  return await Contacts.find();
}

const getContactById = async (contactId) => {
  return await Contacts.findById(contactId);
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
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
