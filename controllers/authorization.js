const { User } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require("nodemailer");
let session;

const login = (req, res) => {
	const page = {
		title: "Login"
	};
	res.status(200).render('auth/login', { 
		page: page,
		layout: false
	});
};

const loginUser = async (req, res) => {

	try {

		const getUser = await User.findOne({ $or: [{username: req.body.username}, {email: req.body.username}] });
		if (getUser) {

			const comparePassword = await bcrypt.compare(req.body.password, getUser.password);
			if (comparePassword) {

				console.log("Succesvol ingelogd!");
				session = req.session;
				session.username = req.body.username;
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
}

const register = (req, res) => {
	const page = {
		title: "register"
	};
    
	res.status(200).render('auth/register', { 
		page: page,
		layout: false
	});
};


const saveUser = async (req, res) => {

	let hashedPassword;
	bcrypt.genSalt(saltRounds, (err, salt) => {
		bcrypt.hash(req.body.password, salt, async(err, hash) => {
			hashedPassword = hash;
			console.log(hashedPassword);
			await User.create({
				username: req.body.username,
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				region: req.body.region,
			})

			session = req.session
			session.username = req.body.username;
			session.email = req.body.email;
			res.redirect('/');	

			let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                  User: "matchtaurant@hotmail.com",
                  pass: "Bloktech",
                },
              });
            
              transporter.sendMail({
                from: '"Matchtaurant" <matchtaurant@hotmail.com>', // sender
                to: User.email, // receiver
                subject: "You are now officially part of the Matchtaurant community!", // subject
                text: "Hi " + User.username + ", welcome to Matchtaurant!", // body
              });
		});
	});

}

module.exports = {
	login: login,
	loginUser: loginUser,
	register: register,
	saveUser: saveUser
};