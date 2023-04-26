const contacts = require("../models/contacts");

const ownerContact = async(req,res,next) => {
  const isOwnerContact = await contacts.getContact({owner: req.user.id, _id: req.params.contactId});
  if (!isOwnerContact) {
    return res.status(404).json({ message: "Not found" });
  };
  next();
};

module.exports = ownerContact;