const { User, Chat } = require('../models');
let session;

const index = async(req, res) => {

	const page = {
		title: "All messages"
	};
		
	session = req.session;

	const chats = await Chat.find({ $or: [{inviter: session.authUser}, {receiver: session.authUser}] })
	.populate('receiver')
	.populate('inviter')
	.lean();

	res.status(200).render('messages/index', { 
		page: page,
		authUser: session.authUser,
		users: chats,
	});
};

const chat = (req, res) => {
	
	const page = {
		title: "Chat"
	};
	session = req.session;
	const promises = [
		User.findOne({ username: session.authUser.username }).lean(), 
		User.findOne({ username: req.params.username }).lean(), 
	];

	Promise.all(promises)
	.then(async result => {
		const [user1, user2] = result;

		const chat = await Chat.findOne({ $or: [{inviter: user1, receiver: user2 }, {inviter: user2, receiver: user1 }] })
		.populate('receiver')
		.populate('inviter')
		.populate({ 
			path: 'history.user',
			model: User
		})	
		.lean()

		let accepted = false;
		if(chat && chat.accepted){
			accepted = true;
		}

		res.status(200).render('messages/chat', { 
			page: page,
			chat: chat,
			authUser: session.authUser,
			accepted: accepted,
		});
	})
};

const create = async(req, res) => {
    
	session = req.session;

	const promises = [
		User.findOne({ username: session.authUser.username }).lean(), 
		User.findOne({ username: req.params.username }).lean(), 
	];

	Promise.all(promises)
	.then(async result => {
		const [authUser, otherUser] = result;

		const checkChat = await Chat.findOne({ $or: [{inviter: authUser, receiver: otherUser }, {inviter: otherUser, receiver: authUser }] })
		if(checkChat){
			res.redirect(`/messages/${otherUser.username}/chat`);
		} else {

			const form = {
				inviter: authUser,
				receiver: otherUser,
				name: `${authUser.username}-${otherUser.username}`
			};
			
			const chat = new Chat(form);
		
			chat.save((err) => {
				if (err) return handleError(err);
				res.redirect(`/messages/${otherUser.username}/chat`);
			});
		}
	});
};

const update = async (req, res) => {
    
	session = req.session;

	const promises = [
		User.findOne({ username: session.authUser.username }).lean(), 
		User.findOne({ username: req.params.username }).lean(), 
	];

	Promise.all(promises)
	.then(async result => {
		const [authUser, otherUser] = result;

		const chat = await Chat.findOne({ $or: [{inviter: authUser, receiver: otherUser }, {inviter: otherUser, receiver: authUser }] })
		if(chat && chat.accepted){
			const input = req.body;
			const newMessage = {
				message: input.msg,
				date: input.date,
				user: authUser,
			}
			chat.history.push(newMessage);
			chat.save((err) => {
				if (err) return handleError(err);
				res.send();
			});
		} else {
			const response = JSON.stringify({
				error: 'not_accepted',
			})
			res.send(response);
		}
	})
};

module.exports = {
	index: index,
	chat: chat,
	create: create,
	update: update,
};