require('dotenv').config();

const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes');



// @desc     Get user by token
// @access   Private
// https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
  function authenticateToken(req, res, next) {
	//get token from header
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[2];
	//check if token exist
	 console.log(token)
	if (token == null) {
		return res.status(401).json({ error: 'Try to login again' });
	}
	//verify token
	 jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ error: 'Invalid json token' });
		}
		 req.user = user;
			next();		return res.status(403).json({ error: 'Invalasdadid json token' });

	});
}

module.exports = authenticateToken;
