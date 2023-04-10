const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath))
  // try {
  //   return console.table(JSON.parse(await fs.readFile(contactsPath)));
  // } catch (err) {
  //   console.log(chalk.red(`Error! ${err.message}`));
  // }
}

const getContactById = async (contactId) => {
  return JSON.parse(await fs.readFile(contactsPath)).find(contact => contact.id === contactId)
  // const searchedContact = JSON.parse(await fs.readFile(contactsPath)).find(contact => contact.id === contactId);
  // if (!searchedContact) {
  //   return {}
  // }
  // return searchedContact
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

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
