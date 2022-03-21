const mongoose = require('mongoose');

const connectionString = `mongodb+srv://YmaroBlue:${process.env.MONGOOSE_PASSWORD}@cluster0.xg8wl.mongodb.net/${process.env.MONGOOSE_DB}?retryWrites=true&w=majority`;
const connectDB = async () => {
	try {
		mongoose.connect(connectionString, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (err) {
		console.log(`Could not make db connection: ${err}`);
		throw err;
	}
};

module.exports = connectDB;
