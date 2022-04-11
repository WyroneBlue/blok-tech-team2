const { Restaurant, RestaurantSwipe, User } = require('../models');
let session;

const index = async (req, res) => {
	session = req.session;
	const page = {
		title: "Home"
	};

	let restaurantLikes;
	let restaurants;
	let hasRestaurants;
	if(session.authUser){

		const authUser = await User.find({ username: session.authUser.username })
		restaurantLikes = await RestaurantSwipe.find({ user: authUser }).populate('restaurant');
		const authUserLikes = restaurantLikes.map((like) => {
			return like.restaurant.slug;
		});

		restaurants = await Restaurant.find({ slug: { "$nin": authUserLikes } }).lean();
		hasRestaurants = restaurants.length > 0 ? '' : 'show';
	} else {
		restaurants = await Restaurant.find().lean();
		hasRestaurants = '';
	}

	res.status(200).render('home', { 
		page: page,
		restaurants: restaurants,
		hasRestaurants: hasRestaurants,
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