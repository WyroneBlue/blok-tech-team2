const express = require('express');
const router = express.Router();
const authorizationController = require("../controllers/authorization");

router.get('/', authorizationController.login);
router.post('/', authorizationController.loginUser);


module.exports = router;