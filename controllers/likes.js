const { User, Restaurant, RestaurantLike } = require('../models'); 

const index = async(req, res) => {
	const page = {
		title: "likes"
	};

	session = req.session
  
	const likes = await RestaurantLike.find({ username: session.authUser.username }).populate("restaurant").lean();
	console.log(likes);
	res.status(200).render('profile/likes', { 
		page: page,
		likes: likes,
	});
};

const saveLike = async(req, res) => {

	session = req.session;
	if(session.authUser){

		const restaurant = await Restaurant.findOne({slug: req.body.restaurant_id}).lean();
		const user = await User.findOne({ username: session.authUser.username }).lean();
		const restaurantLike = await RestaurantLike.create({
			user: user,
			restaurant: restaurant,
		})
		res.send();
	} else {
		res.redirect('/login');
	}
}


module.exports = {
	index: index,
	saveLike: saveLike,
};