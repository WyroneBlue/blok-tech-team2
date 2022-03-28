const express = require('express');
const router = express.Router();
const authorizationController = require("../controllers/authorization");

router.get('/', authorizationController.register);
router.post('/', authorizationController.saveUser);

module.exports = router;
