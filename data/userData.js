const { v4: uuidv4 } = require('uuid');

const users = [
	{
		id: uuidv4(),
		username: 'henk',
		password: '$2b$10$LZXz8vzLFUv7UKlzDxYGK.6hdRl0kvKa/RI4vA3d7IpmyMHFDdkPq', //Henk!23
		email: 'henk@gmail.com',
		role: 'admin'
	},
	{
		id: uuidv4(),
		username: 'user',
		password: '$2b$10$ANS1YPhWrlL1l7NXE159aOzzbrsFk4kGcYEemqySBaB4WaQX3WRnW', //admin
		email: 'admin@gmail.com',
		role: 'user'
	},
	{
		id: uuidv4(),
		username: 'henk3',
		password: '$2b$10$OMn/mTyHdSk6AW0hoknXi.7QY81efCdBbxzwLoH19Yi/k1V5JaBEO', //Henk!23
		email: 'henk3@gmail.com',
		role: 'user'
	}
];

module.exports = users;
