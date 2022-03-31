// Express Setup
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const IO_PORT = process.env.IO_PORT || 8080;
const session = require('express-session')
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
const useSession = session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
})
app.use(useSession);

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

// Websockets
io.on('connection', socket => {
	socket.on('join-chat', (name) => {
		socket.join(name);
	})

	socket.on('new-msg-sent', chat => {
		socket.to(chat.name).emit('new-msg', chat.msg);
	})
})

app.listen(PORT, () => {
  	console.log(`Example app listening on port ${PORT}`);
});

io.on('connection', socket => {
	socket.on('new-msg-sent', msg => {
		socket.broadcast.emit('new-msg', msg);
	})
})
