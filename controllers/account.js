const { User } = require('../models');
let session;

const account = async(req, res) => {
	session = req.session;
	const page = {
		title: "Account"
	};
	
	const user = await User.findOne({ username: session.authUser.username}).lean();
	const region = await User.findOne({ region: session.authUser.region}).lean();
	console.log(user);
	res.status(200).render('profile/account', { 
		page: page,
		layout: false,
		user: user,
		region: region
	});
};

module.exports = {
	account: account
};