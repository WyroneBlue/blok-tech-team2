//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
	inviter: { type: Schema.Types.ObjectId, ref: 'User' },
	receiver: { type: Schema.Types.ObjectId, ref: 'User' },
	accepted: { type: Boolean, default: true },
	pending: { type: Boolean, default: true },
	history: [{ 
		message: { type: String, default: '' },
		date: { type: Date, default: '' },
		user: { type: Schema.Types.ObjectId, ref: 'User'},
	}],
	created: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
