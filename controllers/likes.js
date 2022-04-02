const { RestaurantLike } = require('../models'); 

const index = (req, res) => {
	const page = {
		title: "likes"
	};
  
	// const likes = RestaurantLike.find({ user: session.authUser }).populate("restaurant").lean();

	res.status(200).render('profile/likes', { 
		page: page,
	});
};

const saveLike = (req, res) => {
	const promises = [
		Restaurant.findOne({slug: req.params.slug}).lean(), 
		User.find({}).lean(), 
	];

	Promise.all(promises).then((data) => {

		const [restaurant, user] = data;
		console.log(restaurant);
		console.log(user);
		// const RestaurantLike = await RestaurantLike.create({
		// 	user: user,
		// 	restaurant: restaurant,
		// })
	})
}


module.exports = {
	index: index,
	saveLike: saveLike,
};