const account = (req, res) => {
	const page = {
		title: "Account"
	};
	res.status(200).render('profile/settings', { 
		page: page,
		layout: false
	});
};



module.exports = {
	account: account,
};