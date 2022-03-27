const index = (req, res) => {
	const page = {
		title: "Matched Users"
	};
    
	res.status(200).render('messages/index', { 
		page: page,
	});
};

const chat = (req, res) => {
	const page = {
		title: "Chat"
	};
    
	res.status(200).render('messages/chat', { 
		page: page,
	});
};

module.exports = {
	index: index,
	chat: chat,
};