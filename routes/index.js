const express = require('express');
const router = express.Router();

const home  = require('./home');
const restaurants  = require('./restaurants');
const messages  = require('./messages');
const register = require('./register');

router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/messages', messages);
router.use('/register', register);



module.exports = router;