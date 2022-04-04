const { User } = require('../models');
const Reccomendation = require('../models/Reccomendation');
let session;

const account = async(req, res) => {
	session = req.session;
	const page = {
		title: "Account"
	};
	
	const user = await User.findOne({ username: session.authUser.username}).lean();
	const card = await Reccomendation.find({ user_id: session.authUser._id }).lean();
	
	// console.log(user);
	res.status(200).render('profile/account', { 
		page: page,
		layout: false,
		user: user,
		card: card,
	});
};

const addFavorite = async(req, res) => {
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

const postaddFavorite = (req, res) => {

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

const editFavorite = async(req, res) => {
	session = req.session;
	const page = {
		title: "Edit Favorite"
	};
	
	const user = await User.findOne({ username: session.authUser.username}).lean();
	const card = await Reccomendation.findById(req.params.id).lean();
	
	// console.log(user);
	res.status(200).render('profile/editrestaurant', { 
		page: page,
		layout: false,
		user: user,
		card: card,
	});
};

const posteditFavorite = async(req, res) => {

	session = req.session;
	const input = req.body;

	await Reccomendation.findByIdAndUpdate(req.params.id, {
		restaurant: input.restaurant,
		reccomendation1: input.reccomend1,
		reccomendation2: input.reccomend2,
	});
		
	res.redirect('/account');
};

const deleteFavorite = async(req, res) => {
	session = req.session;

	await Reccomendation.findOne({ _id: req.params.id }).remove().exec();
	res.redirect('/account');
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
	addFavorite: addFavorite,
	postaddFavorite: postaddFavorite,
	editFavorite: editFavorite,
	posteditFavorite: posteditFavorite,
	deleteFavorite: deleteFavorite,
	deleteUser: deleteUser,
	updateUser: updateUser,
	logOut: logOut
};