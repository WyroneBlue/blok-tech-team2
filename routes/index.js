const express = require('express');
const router = express.Router();

const home  = require('./home');
const restaurants  = require('./restaurants');
const messages  = require('./messages');

router.use('/', home);
router.use('/restaurants', restaurants);
router.use('/messages', messages);


module.exports = router;