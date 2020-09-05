const { v4: uuidv4 } = require('uuid');

const users = [
	{
		id: uuidv4(),
		username: 'henk',
		password: 'henk123',
		email: 'henk@gmail.com',
		role: 'admin'
	},
	{
		id: uuidv4(),
		username: 'admin',
		password: 'admin',
		email: 'henk2@gmail.com',
		role: 'user'
	},
	{
		id: uuidv4(),
		username: 'henk3',
		password: 'henk1323',
		email: 'henk3@gmail.com',
		role: 'user'
	}
];

module.exports = users;
