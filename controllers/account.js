const { User } = require('../models');
const Reccomendation = require('../models/Reccomendation');
let session;

const account = async(req, res) => {
	session = req.session;
	const page = {
		title: "Account"
	};
	
	const user = await User.findOne({ username: session.authUser.username}).lean();
	const card = await Reccomendation.find({}).lean();
	
	// console.log(user);
	res.status(200).render('profile/account', { 
		page: page,
		layout: false,
		user: user,
		card: card,
	});
};

const newFavorite = async(req, res) => {
	session = req.session;
	const page = {
		title: "New Favorite"
	};
	
	const user = await User.findOne({ username: session.authUser.username}).lean();
	
	// console.log(user);
	res.status(200).render('profile/newrestaurant', { 
		page: page,
		layout: false,
		user: user,
	});
};

const addFavorite = (req, res) => {

	session = req.session;
	
	Promise.all([User.findOne({username: session.authUser.username}).lean()])
		.then(result => {
			const [user] = result;

			const input = req.body;
			const form = {
				restaurant: input.restaurant,
				user_id: user._id,
				reccomendation1: input.reccomend1,
				reccomendation2: input.reccomend2,
			};

			const reccomendation = new Reccomendation(form);
		
			reccomendation.save((err) => {
				if (err) return handleError(err);
				res.redirect('/account');
			});
		});
};

const deleteUser = async (req, res) => {
    session = req.session;
	console.log(req.session.authUser);
	let user = session.authUser._id;
	console.log(user);
    await User.findOne({ username: req.session.authUser.username }).remove().exec();
    // await User.findByIdAndDelete({ user });
    req.session.destroy();
    res.redirect('/');
};

const updateUser = async (req, res) => {
    session = req.session;
	console.log(req.session.authUser);
	let user = session.authUser._id;
	console.log(user);
    await User.updateOne({ username: req.session.authUser.username}, { username: req.body.username, email: req.body.email, name: req.body.name, region: req.body.region  }).exec();
    // await User.findByIdAndDelete({ user });
    res.redirect('/');
};

const logOut = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
};


module.exports = {
	account: account,
	newFavorite: newFavorite,
	addFavorite: addFavorite,
	deleteUser: deleteUser,
	updateUser: updateUser,
	logOut: logOut
};