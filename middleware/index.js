const parseurl = require('parseurl')
let session;

const loggedIn = (req, res, next) => {
    session = req.session;
    if(session.authUser){
        next()
    } else {
        res.redirect('/login');
    }
};

const guest = (req, res, next) => {

    session = req.session;
    if(!session.authUser){
        next()
    } else {
        res.redirect('/');
    }
};

const viewCounter = (req, res, next) => {

	if (!req.session.views) {
		req.session.views = {}
	}

	// get the url pathname
	var pathname = parseurl(req).pathname

	// count the views
	req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
	next();
};
const { loggedIn, guest } = require('./authorization');
const viewCounter = require('./viewCounter');

module.exports = {
    loggedIn: loggedIn,
    guest: guest,
    viewCounter: viewCounter,
}