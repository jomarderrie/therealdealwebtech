const express = require('express');
const router = express.Router();
const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const users = require('../../data/userData');

const jwt = require('jsonwebtoken');
require('dotenv').config();

// @route POST /auth/
// @desc As an administrator/user and user I want to be able to log in
// @acces Public
router.post('/', async (req, res) => {
	//lets first find the user
	const user = users.find((user) => user.email === req.body.user);
	if (!user) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Cannot find email' });
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const accessToken = jwt.sign(
				{
					username: user.username,
					role: user.role
				},
				process.env.ACCESS_TOKEN_SECRET
			);
			return res.status(StatusCodes.OK).json({ token: accessToken });
		} else {
			return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid info' });
		}
	} catch (err) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
	}
});



module.exports = router;
