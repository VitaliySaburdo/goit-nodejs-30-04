const express = require('express');
const validateData = require('../../helpers/validateData');

const ctrl = require('../../controllers/contacts');

const router = express.Router();

router.get('/', ctrl.getContacts);

router.get('/:contactId', ctrl.getContact);

router.post('/', validateData, ctrl.postContact);

router.delete('/:contactId', ctrl.deleteContact);

router.put('/:contactId', ctrl.putContact);

router.patch('/:contactId', ctrl.patchContact);

module.exports = router

