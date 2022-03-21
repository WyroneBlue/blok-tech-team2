const index = (req, res) => {
	const page = {
		title: "Home"
	};
    
	res.status(200).render('home', { 
		page: page,
	});
};

module.exports = {
	index: index
};