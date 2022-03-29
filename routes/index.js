const express = require('express');
const router = express.Router();

const home  = require('./home');
const restaurants  = require('./restaurants');
const messages  = require('./messages');
const register = require('./register');
const error = require('./error');


router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/messages', messages);
router.use('/register', register);
router.use('*', error);




module.exports = router;