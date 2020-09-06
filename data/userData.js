const { v4: uuidv4 } = require('uuid');

const users = [
	{
		id: uuidv4(),
		username: 'henk',
		password: '$2b$10$27RjxDcu2h0Lx8s.33CuUOthWHM3gQHm.TFLUKbU0cojSKq5LaD6.', //henk123
		email: 'henk@gmail.com',
		role: 'admin'
	},
	{
		id: uuidv4(),
		username: 'admin',
		password: '$2b$10$ANS1YPhWrlL1l7NXE159aOzzbrsFk4kGcYEemqySBaB4WaQX3WRnW', //admin
		email: 'admin@gmail.com',
		role: 'user'
	},
	{
		id: uuidv4(),
		username: 'henk3',
		password: '$2b$10$H4FzSgdcWA1DMpDypfeC5uEj.H9N/5QLuz2aEdZ7S5zEav/LIylPG', //henk123321
		email: 'henk3@gmail.com',
		role: 'user'
	}
];

module.exports = users;
