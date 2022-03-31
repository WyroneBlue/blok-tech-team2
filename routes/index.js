const express = require('express');
const router = express.Router();

const home  = require('./home');
const restaurants  = require('./restaurants');
const messages  = require('./messages');
const register = require('./register');
const error = require('./error');
const login = require('./login');
const account = require('./account');

router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/messages', loggedIn, messages);
router.use('/register', register);
router.use('/login', guest, login);
router.use('/account', account);
router.use('*', error);



module.exports = router;