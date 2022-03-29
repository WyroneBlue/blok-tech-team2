//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
	name: String,
	slug: String,
	description: String,
	image: String,
	location: String,
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
