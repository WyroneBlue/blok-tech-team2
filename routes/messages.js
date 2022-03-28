const express = require('express');
const router = express.Router();
const messagesController = require("../controllers/messages");

// Restaurants
router.get('/', messagesController.index);
router.get('/:username/new', messagesController.create);
router.get('/:username/chat', messagesController.chat);
router.post('/:username/chat', messagesController.update);

module.exports = router;