const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home");

router.get('/', homeController.index);
// router.get('*', homeController.error);




module.exports = router;