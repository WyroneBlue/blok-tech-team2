const index = (req, res) => {
	const page = {
		title: "Home"
	};
    
	res.status(200).render('home', { 
		page: page,
	});
};


// const error = (req, res) => {
// 	const page = {
// 		title: "error"
// 	};
    
// 	res.status(200).render('/error', { 
// 		page: page,
// 		layout: false
// 	});
// };

module.exports = {
	index: index,
	// register: register,
	// error: error

};