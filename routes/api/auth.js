const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../../data/userData');
const { v4: uuidv4 } = require('uuid');

// @route POST /user
// @desc As a user I want to be able to register (email address and password)
// @acces Public
router.post('/', async (req, res) => {
	const { username, email, password } = req.body;

	if (username === undefined) {
		res.status(404).json({ msg: 'Email or username not filled in' });
	}
	if (email === undefined) {
		res.status(404).json({ msg: 'Email or username not filled in' });
	}

	let responseObject = [];
	let userExist = users.find((user) => {
		if (user.username === username || user.email === email) {
			return user;
		}
	});

	if (userExist != undefined) {
		res.status(404).json({ msg: 'Email or username already exist' });
	} else {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
		responseObject = {
			id: uuidv4(),
			username: username,
			password: hashedPassword,
			email: email
		};
		users.push(responseObject);
		res.status(200).json({ user: responseObject });
	}
});

// @route POST /login
// @desc As an administrator and user I want to be able to log in
// @acces Public

router.post('/login', async (req, res) => {
	const user = users.find((user) => user.email === req.body.email);
	if (user == null) {
		return res.status(400).json({ msg: 'Cannot find email' });
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.status(200).json({ user: user });
		} else {
			res.status(400).json({ msg: 'Invalid password' });
		}
	} catch (err) {
		res.status(500).json({ msg: 'Internal server error' });
	}
});

module.exports = router;
