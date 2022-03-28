const { Restaurant } = require('../models');

const index = async (req, res) => {
	const page = {
		title: "Home"
	};
	const restaurants = await Restaurant.find().lean();
	console.log(restaurants);
	res.status(200).render('home', { 
		page: page,
		restaurants: restaurants
	});
};

module.exports = {
	index: index
};