const contacts = require("../models/contacts");


const getContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.contactId);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    const newContact = await contacts.addContact(req.body);
    console.log(newContact)
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const result = await contacts.removeContact(req.params.contactId);
    console.log("result", result);
    if (result) {
      return res.json({ message: "contact deleted" });
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const putContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      return res.status(404).json({ message: "missing fields" });
    }
    const result = await contacts.updateContact(req.params.contactId, req.body);
    if (result) {
      return res.json(result);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const patchContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).includes('favorite')) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const result = await contacts.updateStatusContact(req.params.contactId, req.body);
    if (result) {
      return res.json(result);
    }
    res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  postContact,
  deleteContact,
  putContact,
  patchContact,
};
