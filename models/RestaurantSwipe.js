//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RestaurantSwipeSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
	swipe: String,
	created: {type: Date, default: Date.now},
});

const RestaurantSwipe = mongoose.model('RestaurantSwipe', RestaurantSwipeSchema);

module.exports = RestaurantSwipe;
