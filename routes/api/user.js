const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const users = require('../../data/userData');
const { v4: uuidv4 } = require('uuid');

// @route GET /user
// @desc As a user I want to be able to register (email address and password)
// @acces Public
router.post('/', (req, res) => {
	const { username, email, password } = req.body;
	let responseObject = [];
	let userExist = users.find((user) => {
		if (user.username === username || user.email === email) {
			return user;
		}
	});

	if (userExist != undefined) {
		res.status(404).json({ msg: 'Email already exist' });
	} else {
		responseObject = {
			id: uuidv4(),
			username: username,
			password: password,
			email: email
		};
		// responseObject['id'] = uuidv4();
		// responseObject['username'] = username;
		// responseObject['password'] = password;
		// responseObject['email'] = email;
		console.log(responseObject);
		users.push(responseObject);
		res.status(200).json({ user: responseObject });
	}
});

router.get('/', (req, res) => {
	res.json({ usersobject: users });
});
module.exports = router;
