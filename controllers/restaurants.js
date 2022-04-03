const { RestaurantSwipe, Restaurant, Review } = require('../models');
const { avgFromObject } = require('../utils/Functions');

const index = (req, res) => {
	res.redirect('/');
};

const show = (req, res) => {

	const promises = [
		Restaurant.findOne({slug: req.params.slug}).lean(), 
		Review.find({ restaurant_slug: req.params.slug}).lean()
	];

	Promise.all(promises)
		.then(async result => {
			const [restaurant, reviews] = result;
			
			const userLikes = await RestaurantSwipe.find({ restaurant: restaurant }).populate('user').lean();
			const page = {
				title: restaurant.name
			};

			const avg = avgFromObject(reviews, 'rating').toFixed(1);
				
			res.status(200).render('restaurants/show', { 
				page: page,
				restaurant: restaurant,
				userLikes: userLikes,
				avg: avg,
			});
		});
};

module.exports = {
	index: index,
	show: show,
};