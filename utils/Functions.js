const avgFromObject = (obj, prop) => {
	return Object.values(obj).reduce((t, item) => t + item[prop], 0) / obj.length;
};

module.exports = {
	avgFromObject: avgFromObject,
};
