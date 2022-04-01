const { Restaurant } = require('../models');
let session;

const index = async (req, res) => {
	session = req.session;
	const page = {
		title: "Home"
	};
	
	const restaurants = await Restaurant.find().lean();
	res.status(200).render('home', { 
		page: page,
		restaurants: restaurants,
		authUser: session.authUser
	});
};

const welkom = (req, res) => {
	const page = {
		title: "Welcome"
	};
	res.status(200).render('auth/welkom', { 
		page: page,
		layout: false
	});
};

module.exports = {
	index: index,
	welkom: welkom
};