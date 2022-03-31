const express = require('express');
const router = express.Router();
const accountController = require("../controllers/account");


router.get('/', accountController.account);


module.exports = router;