const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath))
}

const getContactById = async (contactId) => {
  return JSON.parse(await fs.readFile(contactsPath)).find(contact => contact.id === contactId)
}

const removeContact = async (contactId) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  const updatedContacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  console.log('con', contacts.length)
  console.log('update con', updatedContacts.length)
  if (contacts.length === updatedContacts.length) {
    return null
  }
  return contactId
}

const addContact = async (newContact) => {
  const updatedContacts = [...JSON.parse(await fs.readFile(contactsPath)), newContact];
  return await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  // return await fs.writeFile(contactsPath, JSON.stringify([...JSON.parse(await fs.readFile(contactsPath)), newContact]));
}

const updateContact = async (contactId, body) => {
  const contacts = JSON.parse(await fs.readFile(contactsPath));
  let updatedContact = contacts.find(contact => contact.id === contactId);
  if (!updatedContact) {
    return null
  }
  const updatedContacts = contacts.map(contact => {
    if (contact.id === contactId) {
      updatedContact = {...contact, ...body }
      return updatedContact
    }
    return contact
  } )
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
