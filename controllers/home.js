const index = (req, res) => {
	const page = {
		title: "Home"
	};
    
	console.log(req.session);
	res.status(200).render('home', { 
		page: page,
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