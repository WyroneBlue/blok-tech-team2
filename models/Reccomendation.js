//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ReccomendSchema = new Schema({
	user_id: String,
	restaurant: String,
	reccomendation1: String,
	reccomendation2: String,
});

const Reccomendation = mongoose.model('Reccomendations', ReccomendSchema);

module.exports = Reccomendation;
