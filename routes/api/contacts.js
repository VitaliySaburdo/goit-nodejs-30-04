const express = require('express')
const contacts = require('../../models/contacts');
const validateData = require('../../helpers/validateData');
const { nanoid } = require("nanoid");

const router = express.Router()

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
})

router.get('/:contactId', async (req, res, next) => {
  const result = await contacts.getContactById(req.params.contactId);
  if (!result) {
    return res.status(404).json({"message": "Not found"});
  }
  res.json(result);
})

router.post('/', validateData,   async (req, res, next) => {
  const newContact = {...req.body, id: nanoid()}
  contacts.addContact(newContact)
  res.status(201).json(newContact)
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await contacts.removeContact(req.params.contactId);
  console.log('result', result)
  if (result) {
    return res.json({ message: 'contact deleted' });
  }
  res.status(404).json({ message: 'Not found' });
})

router.put('/:contactId', async (req, res, next) => {
  console.log('body',req.body)
  if (!Object.keys(req.body).length) {
    return res.status(404).json({ message: 'missing fields' });
  }
  const result = await contacts.updateContact(req.params.contactId, req.body);
  if (result) {
    return res.json(result);
  }
  res.status(404).json({ message: 'Not found' });
})

module.exports = router
