const { User } = require('../models');
let session;

const account = async(req, res) => {
	session = req.session;
	const page = {
		title: "Account"
	};
	
	const user = await User.findOne({ username: session.authUser.username}).lean();
	
	console.log(user);
	res.status(200).render('profile/account', { 
		page: page,
		layout: false,
		user: user,
	});
};

module.exports = {
	account: account
};