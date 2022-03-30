const express = require('express');
const router = express.Router();

const likes = require('../controllers/likes');

router.get('/', likes.index);

module.exports = router;