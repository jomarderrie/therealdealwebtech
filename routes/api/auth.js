const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../../data/userData');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @route POST /auth/
// @desc As an administrator/user and user I want to be able to log in
// @acces Public
router.post('/', async (req, res) => {
	const user = users.find((user) => user.email === req.body.email);

	if (user == null) {
		return res.status(400).json({ msg: 'Cannot find email' });
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
			res.status(200).json({ token: accessToken });
		} else {
			res.status(400).json({ msg: 'Invalid info' });
		}
	} catch (err) {
		res.status(500).json({ msg: 'Internal server error' });
	}
});

// @route POST /auth/delete
// @desc As an administrator/user and user I want to be able to log out
// @acces Public
router.delete('/logout', auth, (req, res) => {
	req.user.deleteToken(req.token, (err, user) => {});
});

module.exports = router;
