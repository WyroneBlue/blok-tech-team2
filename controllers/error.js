
const error = (req, res) => {
	const page = {
		title: "error"
	};
    
	res.status(200).render('error', { 
		page: page,
		layout: false
	});
};

module.exports = {
	error: error
};