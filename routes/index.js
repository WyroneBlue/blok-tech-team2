const express = require('express');
const router = express.Router();

const home  = require('./home');
const restaurants  = require('./restaurants');

router.use('/', home);
router.use('/restaurants', restaurants);


module.exports = router;