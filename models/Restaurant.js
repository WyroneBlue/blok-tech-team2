//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
	name: String,
	slug: String,
	description: String,
	image: String,
	location: { 
		address: { type: String, default: '' },
		link: { type: String, default: '' },
	},
	cuisines: [{
		name:  { type: String, default: '' },
		color: { type: String, default: '' }
	}],	
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
