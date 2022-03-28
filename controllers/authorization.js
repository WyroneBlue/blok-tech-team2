const {User} = require('../models');
let session;
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
	console.log(req.body);
	await User.create({
		username: req.body.username,
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		region: req.body.region,
	})
	session = req.session
	session.username = req.body.username;
	session.email = req.body.email;
	res.redirect('/');
	
}

module.exports = {
	register: register,
	saveUser: saveUser
};