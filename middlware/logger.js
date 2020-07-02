const moment = require("moment");

//create a middleware takes 3 parameters: request, response & next

/* const logger = (req, res, next) => {
	console.log(
		"Hello middlware is console log this every time we write on the page"
	);
	next();
}; */

//getting the http, host and things from the request
const logger = (req, res, next) => {
	console.log(
		`${req.protocol}://${req.get("host")}${
			req.originalUrl
		}:${moment().format()}`
	);
	next();
};

module.exports = logger;
