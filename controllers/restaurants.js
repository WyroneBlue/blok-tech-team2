const { User, Restaurant, Review } = require('../models');
const { avgFromObject } = require('../utils/Functions');

const index = (req, res) => {
	
	const promises = [
		Restaurant.find({}).lean()
	];

	Promise.all(promises)
		.then(result => {
			const [restaurants] = result;
			const page = {
				title: "Restaurants"
			};

			res.status(200).render('restaurant/index', { 
				page: page,
				restaurants: restaurants,
			});
		});
};

const show = (req, res) => {

	const promises = [
		Restaurant.findOne({slug: req.params.slug}).lean(), 
		User.find({}).lean(), 
		Review.find({ restaurant_slug: req.params.slug}).lean()
	];

	Promise.all(promises)
		.then(result => {
			const [restaurant, users, reviews] = result;

			const page = {
				title: restaurant.name
			};

			const avg = avgFromObject(reviews, 'rating').toFixed(1);
				
			res.status(200).render('restaurant/show', { 
				page: page,
				restaurant: restaurant,
				users: users,
				avg: avg,
			});
		});
};

module.exports = {
	index: index,
	show: show,
};