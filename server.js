// Express Setup
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const IO_PORT = process.env.IO_PORT || 8080;
const session = require('express-session')
var parseurl = require('parseurl')

const io = require('socket.io')(IO_PORT, {
	cors: {
		origin: "*"
	}
});

// Database (MongoDB)
require('dotenv').config();
const db = require('./config/db');
db();

// BodyParser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// sessions

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
  }))
  
  app.use(function (req, res, next) {
	if (!req.session.views) {
	  req.session.views = {}
	}
  
  
  // get the url pathname
  var pathname = parseurl(req).pathname
  
  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1
  
  next()
  })

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

io.on('connection', socket => {
	socket.on('new-msg-sent', msg => {
		socket.broadcast.emit('new-msg', msg);
	})
})



  