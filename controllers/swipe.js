const { User, Restaurant, RestaurantSwipe } = require('../models'); 
let session;
const index = async(req, res) => {
	const page = {
		title: "likes"
	};

	session = req.session
  
	const likes = await RestaurantSwipe.find({ user: session.authUser, swipe: 'like' }).populate("restaurant").lean();
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
		await RestaurantSwipe.create({
			user: user,
			restaurant: restaurant,
			swipe: 'like',
		})
		res.send();
	} else {
		res.sendStatus(403);
	}
}

const saveDislike = async(req, res) => {

	session = req.session;
	if(session.authUser){

		const restaurant = await Restaurant.findOne({slug: req.body.restaurant_id}).lean();
		const user = await User.findOne({ username: session.authUser.username }).lean();
		await RestaurantSwipe.create({
			user: user,
			restaurant: restaurant,
			swipe: 'dislike',
		})
		res.send();
	} else {
		res.sendStatus(403);
	}
}

module.exports = {
	index: index,
	saveLike: saveLike,
	saveDislike: saveDislike,
};