const express = require('express');
const router = express.Router();
const authorizationController = require("../controllers/authorization");

router.get('/', authorizationController.login);
router.post('/', authorizationController.loginUser);
router.post('/settings', authorizationController.settings);


module.exports = router;