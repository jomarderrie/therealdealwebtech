const jwt = require('jsonwebtoken');
require('dotenv').config();

// @route    GET api/auth
// @desc     Get user by token
// @access   Private

function authenticateToken(req, res, next) {
	//get token from header
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	//check if token exist
	if (token == null) return res.sendStatus(401).json({ msg: 'Try to login again' });
	//verify token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err);
		if (err) return res.sendStatus(403).json({ msg: 'Invalid json token' });
		req.user = user;
		next();
	});
}

module.exports = authenticateToken;
