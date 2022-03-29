const express = require('express');
const router = express.Router();

const home  = require('./home');
const restaurants  = require('./restaurants');
const messages  = require('./messages');
const register = require('./register');
const error = require('./error');
const login = require('./login');

router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/messages', messages);
router.use('/register', register);
router.use('/login', login);
router.use('*', error);




module.exports = router;