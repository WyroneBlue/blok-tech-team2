const express = require('express');
const router = express.Router();

const likes = require('../controllers/likes');

router.get('/', likes.index);
router.post('/save', likes.saveLike);

module.exports = router;