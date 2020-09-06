const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../../data/userData');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// @route POST /auth/register
// @desc As a user I want to be able to register (email address and password)
// @acces Public
router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	if (username === undefined) {
		res.status(404).json({ msg: 'Email or username not filled in' });
	}
	if (email === undefined) {
		res.status(404).json({ msg: 'Email or username not filled in' });
	}
	if (password === undefined) {
		res.status(404).json({ msg: 'Email or username not filled in' });
	}

	let responseObject = [];
	let userExist = users.find((user) => {
		if (user.email === email) {
			return user;
		}
	});

	if (userExist != undefined) {
		res.status(404).json({ msg: 'Email or username already exist' });
	} else {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		responseObject = {
			id: uuidv4(),
			username: username,
			password: hashedPassword,
			email: email,
			role: 'user'
		};
		users.push(responseObject);
		res.status(200).json({ user: responseObject });
	}
});

// @route POST /auth/login
// @desc As an administrator/user and user I want to be able to log in
// @acces Public

router.post('/login', async (req, res) => {
	const user = users.find((user) => user.email === req.body.email);

	if (user == null) {
		return res.status(400).json({ msg: 'Cannot find email' });
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
			res.status(200).json({ token: accesToken });
		} else {
			res.status(400).json({ msg: 'Invalid info' });
		}
	} catch (err) {
		res.status(500).json({ msg: 'Internal server error' });
	}
});

router.post('/token');

router.delete('/logout');

module.exports = router;
