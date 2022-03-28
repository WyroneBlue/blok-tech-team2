//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: String,
	username: String,
	email: String,
	img: {type: String, default: 'https://picsum.photos/200'},
	reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
	created: {type: Date, default: Date.now},
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
