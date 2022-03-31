//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RestaurantLikeSchema = new Schema({
	created: {type: Date, default: Date.now},
	user: { type: Schema.Types.ObjectId, ref: 'User' },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
});

const RestaurantLike = mongoose.model('RestaurantLike', RestaurantLikeSchema);

module.exports = RestaurantLike;
