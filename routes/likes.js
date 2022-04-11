const express = require('express');
const router = express.Router();
const { loggedIn } = require('../middleware');

const swipeController = require('../controllers/swipe');

router.get('/', loggedIn, swipeController.index);
router.post('/save', swipeController.saveLike);

module.exports = router;