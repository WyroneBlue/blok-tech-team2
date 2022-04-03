const express = require('express');
const router = express.Router();
const accountController = require("../controllers/account");

router.get('/', accountController.account);

router.get('/favorite', accountController.newFavorite);

router.post('/favorite', accountController.addFavorite);

router.post('/deleteUser', accountController.deleteUser);

router.post('/updateUser', accountController.updateUser);

router.post('/logOut', accountController.logOut);


module.exports = router;