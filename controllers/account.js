const { User, RestaurantSwipe, Reccomendation, Menu } = require('../models');

let session;

const account = async(req, res) => {
	session = req.session;
	const page = {
		title: "Account"
	};
	
	const user = await User.findOne({ _id: session.authUser._id}).lean();
	const card = await Reccomendation.find({ user_id: session.authUser._id }).populate("restaurant reccomendation1 reccomendation2").lean();
	
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
	
	const menu = await Menu.find({}).populate("restaurant").lean();
	const user = await User.findOne({ username: session.authUser.username}).lean();
	const likes = await RestaurantSwipe.find({ user: session.authUser, swipe: 'like' }).populate("restaurant").lean();
	
	// console.log(user);
	res.status(200).render('profile/newrestaurant', { 
		page: page,
		layout: false,
		user: user,
		likes: likes,
		menu: menu,
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
	const card = await Reccomendation.findById(req.params.id).populate("restaurant").lean();
	const menu = await Menu.find({ restaurant: card.restaurant }).populate("restaurant").lean();
	
	// console.log(user);
	res.status(200).render('profile/editrestaurant', { 
		page: page,
		layout: false,
		user: user,
		card: card,
		menu: menu,
		cardRes: card.restaurant,
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
	addFavorite: addFavorite,
	postaddFavorite: postaddFavorite,
	editFavorite: editFavorite,
	posteditFavorite: posteditFavorite,
	deleteFavorite: deleteFavorite,
	deleteUser: deleteUser,
	updateUser: updateUser,
	logOut: logOut
};