const { User } = require('../models');
let session;

const account = (req, res) => {
	session = req.session;
	const page = {
		title: "Account"
	};
    
	res.status(200).render('profile/account', { 
		page: page,
		layout: false,
	});
};

module.exports = {
	account: account
};