// Express Setup
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Database (MongoDB)
require('dotenv').config();
const db = require('./config/db');
db();

// BodyParser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Routes
const routes = require("./routes");

// HBS Setup
const { engine } = require ('express-handlebars');
app.engine('hbs', engine({ 
 	extname: 'hbs', 
 	defaultLayout: 'main', 
 	layoutsDir: __dirname + '/views/layouts/',
 	partialsDir: __dirname + '/views/partials/',
	helpers: require('./config/hbs-helpers')
}));
app.set('view engine', 'hbs');
app.set("views", "./views");
app.use('/public', express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/', urlencodedParser, routes);

app.listen(PORT, () => {
  	console.log(`Example app listening on port ${PORT}`);
});
