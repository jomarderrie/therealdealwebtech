require('dotenv').config();

const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes');

// @desc     Get user by token
// @access   Private
function authenticateToken(req, res, next) {
	//get token from header
	const authHeader = req.headers['authorization'];


	const token = authHeader && authHeader.split(' ')[1];
	//check if token exist
	console.log(token)
	if (token == null) {
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Try to' +
				' login again' });
	}
	//verify token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(StatusCodes.FORBIDDEN).json({ error: 'Invalid' +
					' json token' });
		}
		req.user = user;
		next();
	});
}

module.exports = authenticateToken;
