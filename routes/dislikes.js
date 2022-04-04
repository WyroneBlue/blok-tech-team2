const express = require('express');
const router = express.Router();

const swipeController = require('../controllers/swipe');

router.post('/save', swipeController.saveDislike);

module.exports = router;