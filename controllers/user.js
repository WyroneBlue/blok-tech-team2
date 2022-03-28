const { User, Restaurant, Review } = require('../models');
const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/inloggen', async (req, res) => {
    try {
        const getUser = await User.findOne({ username: req.body.name });
        if (getUser) {
            console.log(req.body.password);
            console.log(getUser.password)
          const comparePassword = await bcrypt.compare(req.body.password, getUser.password);
          console.log(comparePassword)
          if (comparePassword) {
            console.log("Succesvol ingelogd!");
            session = req.session;
            session.name = req.body.name;
            return res.status(200).redirect('/');
          } else {
            console.error("Verkeerde gebruikersnaam of wachtwoord!");
            return res.status(404).redirect('/login');
          }
        } else {
            console.error("Geen user gevonden");
            return res.status(404).redirect('/login');
        }
    } catch (error) {
        // Als dit niet zo is kom je er dus niet in
        console.error(error);
        return res.status(500).redirect('/login');
    }
});