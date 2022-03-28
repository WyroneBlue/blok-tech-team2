

const express = require('express');
const router = express.Router();
const authorizationController = require("../controllers/authorization");

// router.get('/', {name}.{functie);
// router.get('/nog-een-route', {name}.{functie);
router.get('/', authorizationController.register);

router.post('/', authorizationController.saveUser);


module.exports = router;
