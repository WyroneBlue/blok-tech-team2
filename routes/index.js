const express = require('express');
const router = express.Router();
const { loggedIn, guest, viewCounter } = require('../middleware');

const home  = require('./home');
const restaurants  = require('./restaurants');
const messages  = require('./messages');
const register = require('./register');
const likes = require('./likes');
const error = require('./error');
const login = require('./login');
const account = require('./account');

router.use(viewCounter);
router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/messages', loggedIn, messages);
router.use('/likes', likes);
router.use('/register', register);
router.use('/login', guest, login);
router.use('/account', account);
router.use('*', error);

module.exports = router;