//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	restaurant_slug: String,
	rating: Number,
	remark: String,
	anon: Boolean,
	created: {type: Date, default: Date.now},
	user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;