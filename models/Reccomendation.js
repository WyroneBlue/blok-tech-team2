//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const ReccomendSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User' },
	restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
	reccomendation1: { type: Schema.Types.ObjectId, ref: 'Menu' },
	reccomendation2: { type: Schema.Types.ObjectId, ref: 'Menu' },
});

const Reccomendation = mongoose.model('Reccomendations', ReccomendSchema);

module.exports = Reccomendation;
