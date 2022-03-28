const index = (req, res) => {
	const page = {
		title: "Home"
	};
    
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

const login = (req, res) => {
	const page = {
		title: "Login"
	};
    
	res.status(200).render('auth/login', { 
		page: page,
		layout: false
	});
};

module.exports = {
	index: index,
	login: login,
	welkom: welkom
};