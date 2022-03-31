const { Restaurant } = require('../models');

const index = async (req, res) => {

	const page = {
		title: "Home"
	};
	
	const restaurants = await Restaurant.find().lean();
	res.status(200).render('home', { 
		page: page,
		restaurants: restaurants
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