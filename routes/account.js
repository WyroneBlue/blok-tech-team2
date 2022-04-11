const express = require('express');
const router = express.Router();
const accountController = require("../controllers/account");

router.get('/', accountController.account);

router.get('/newFavorite', accountController.addFavorite);
router.post('/newFavorite', accountController.postaddFavorite);

router.get('/editFavorite/:id', accountController.editFavorite);
router.post('/editFavorite/:id', accountController.posteditFavorite);
router.post('/deleteFavorite/:id', accountController.deleteFavorite);

router.post('/deleteUser', accountController.deleteUser);

router.post('/updateUser', accountController.updateUser);

router.post('/logOut', accountController.logOut);


module.exports = router;