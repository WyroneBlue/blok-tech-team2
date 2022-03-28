const { User, Chat } = require('../models');

const index = async(req, res) => {
	const page = {
		title: "All messages"
	};

	const user = await User.findOne({ username: 'ymaroblue'}).lean();
	const chats = await Chat.find({ $or: [{inviter: user}, {receiver: user}] })
	.populate('inviter').populate('receiver').lean();
	res.status(200).render('messages/index', { 
		page: page,
		users: chats,
	});
};

const chat = (req, res) => {
	const page = {
		title: "Chat"
	};
    
	const promises = [
		User.findOne({ username: 'ymaroblue' }).lean(), 
		User.findOne({ username: req.params.username }).lean(), 
	];

	Promise.all(promises)
	.then(async result => {
		const [inviter, receiver] = result;
		
		const chat = await Chat.findOne({ inviter: inviter, receiver: receiver }).populate('receiver')
		.populate({ 
			path: 'history.user',
			model: User
		})	
		.lean()
		console.log(chat);
		let accepted = false;
		if(chat && chat.accepted){
			accepted = true;
		}

		res.status(200).render('messages/chat', { 
			page: page,
			chat: chat,
			accepted: accepted,
		});
	})


};

const create = async(req, res) => {
    
	const promises = [
		User.findOne({ username: 'ymaroblue' }).lean(), 
		User.findOne({ username: req.params.username }).lean(), 
	];

	Promise.all(promises)
	.then(async result => {
		const [inviter, receiver] = result;

		// console.log(inviter);
		// console.log(receiver);

		const checkChat = await Chat.findOne({ inviter: inviter, receiver: receiver });
		if(checkChat){
			res.redirect(`/messages/${receiver.username}/chat`);
		} else {

			const form = {
				inviter: inviter,
				receiver: receiver,
			};

			const chat = new Chat(form);
		
			chat.save((err) => {
				if (err) return handleError(err);
				res.redirect(`/messages/${receiver.username}/chat`);
			});
		}
	});
};

const update = async (req, res) => {
    
	const promises = [
		User.findOne({ username: 'ymaroblue' }).lean(), 
		User.findOne({ username: req.params.username }).lean(), 
	];
	// console.log(req.body);
	Promise.all(promises)
	.then(async result => {
		const [inviter, receiver] = result;

		const chat = await Chat.findOne({ inviter: inviter, receiver: receiver})
		if(chat && chat.accepted){
			const input = req.body;
			const newMessage = {
				message: input.msg,
				date: input.date,
				user: inviter,
			}
			chat.history.push(newMessage);
			chat.save((err) => {
				if (err) return handleError(err);
				res.send();
			});
		} else {
			res.send('not_accepted');
		}

		// await Chat.findOneAndUpdate(
		// 	{ inviter: inviter, receiver: receiver }, 
		// 	{ $push: { history: newMessage }}
		// );
	})
};

module.exports = {
	index: index,
	chat: chat,
	create: create,
	update: update,
};