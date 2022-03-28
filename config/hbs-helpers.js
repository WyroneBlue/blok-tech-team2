const moment = require('moment'); // require

const multiply = (a, b) => {
	return a * b; 
};

const add = (a, b) => {
	return a + b; 
};

const divide = (a, b) => {
	return a / b; 
};

const bool = (check, val) => {
	return check === true ? val : ''; 
};

const compare = (val1, options) => {
	return (val1 == auth_user_id()) ? options.fn(this) : options.inverse(this);
};

const auth_user_id = () => {
	return process.env.USER_ID;
};

const stars = (rating, stars, starsWidth) => {
	const width = stars * starsWidth;
	return multiply(divide(rating, stars), width);
};

const times = (n, block) => {
	var accum = '';
	for(var i = 0; i < n; ++i)
		accum += block.fn(i);
	return accum;
};

const date = (date, format) => {
	var mmnt = moment(date);
	return mmnt.format(format);
};

module.exports = {
	multiply: multiply,
	add: add,
	divide: divide,
	bool: bool,
	compare: compare,
	auth_user_id: auth_user_id,
	stars: stars,
	times: times,
	date: date,
};