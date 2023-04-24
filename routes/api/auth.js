const express = require('express');

const auth = require('../../middlewares/auth');

const ctrl = require('../../controllers/auth');


const router = express.Router();

router.post('/register', ctrl.register);

router.post('/login', ctrl.login);

router.post('/logout', auth, ctrl.logout);

router.get('/current', auth, ctrl.current);

module.exports = router;