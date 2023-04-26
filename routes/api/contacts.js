const express = require('express');
const validateData = require('../../helpers/validateData');
const auth = require('../../middlewares/auth');
const owner = require('../../middlewares/ownerConctact');

const ctrl = require('../../controllers/contacts');

const router = express.Router();

router.use(auth);

router.get('/', ctrl.getContacts);

router.get('/:contactId', ctrl.getContact);

router.post('/', validateData, ctrl.postContact);

router.delete('/:contactId', owner, ctrl.deleteContact);

router.put('/:contactId', owner, ctrl.putContact);

router.patch('/:contactId/favorite', owner, ctrl.patchContact);

module.exports = router;

