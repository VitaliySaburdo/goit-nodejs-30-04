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

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
