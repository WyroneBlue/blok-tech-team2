const { User } = require('../models');
let session;

const account = async(req, res) => {
	session = req.session;
	const page = {
		title: "Account"
	};
	
	const user = await User.findOne({ _id: session.authUser._id}).lean();
	res.status(200).render('profile/account', { 
		page: page,
		layout: false,
		user: user,
	});
};

const deleteUser = async (req, res) => {
    session = req.session;
    await User.findOne({ username: req.session.authUser.username }).remove().exec();
    req.session.destroy();
    res.redirect('/');
};

const updateUser = async (req, res) => {
    session = req.session;
    await User.updateOne({ username: req.session.authUser.username}, { username: req.body.username, email: req.body.email, name: req.body.name, region: req.body.region  }).exec();
    res.redirect('/');
};

const logOut = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
};


module.exports = {
	account: account,
	deleteUser: deleteUser,
	updateUser: updateUser,
	logOut: logOut
};