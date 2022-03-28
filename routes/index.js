const express = require('express');
const router = express.Router();

const home  = require('./home');
const restaurants  = require('./restaurants');
const messages  = require('./messages');
const register = require('./register');
const login = require('./login');

router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/messages', messages);
router.use('/register', register);
router.use('/login', login);



module.exports = router;