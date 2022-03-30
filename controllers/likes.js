const index = (req, res) => {
	const page = {
		title: "likes"
	};
    
	res.status(200).render('profile/likes', { 
		page: page,
	});
};

module.exports = {
	index: index
};