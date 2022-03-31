
const express = require('express');
const router = express.Router();
const errorController = require("../controllers/error");

// router.get('/', {name}.{functie);
// router.get('/nog-een-route', {name}.{functie);
router.get('/', errorController.error);

// router.post('/', errorController.saveUser);


module.exports = router;