const { RestaurantLike } = require('../models'); 

const index = (req, res) => {
	const page = {
		title: "likes"
	};
  
	const likes = RestaurantLike.find({ user: session.authUser }).populate("restaurant").lean();

	res.status(200).render('profile/likes', { 
		page: page,
		likes: likes,
	});
};

module.exports = {
	index: index
};