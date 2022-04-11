//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
	item: String,
	restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
	img: String,
});

const Menu = mongoose.model('Menu', MenuSchema, 'menu');

module.exports = Menu;
