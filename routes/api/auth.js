const express = require('express');

const ctrl = require('');

const router = express.Router();

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

module.exports = router;