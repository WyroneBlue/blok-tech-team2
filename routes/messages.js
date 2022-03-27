const express = require('express');
const router = express.Router();
const messagesController = require("../controllers/messages");

// Restaurants
router.get('/', messagesController.index);
router.get('/:user/chat', messagesController.chat);

module.exports = router;