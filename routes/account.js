const express = require('express');
const router = express.Router();
const accountController = require("../controllers/account");
const { User } = require('../models');
let session;

router.get('/', accountController.account);

// router.post('/delete', async (req, res) => {
//     session = req.session;
//     console.log(req.session.username)
//     User.find({ username: req.session.username }).remove().exec();
//     req.session.destroy();
//     res.redirect('/');
// });


module.exports = router;