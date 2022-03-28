const parseurl = require('parseurl')
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
module.exports = {
    viewCounter: viewCounter,
}