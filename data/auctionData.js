const { v4: uuidv4 } = require('uuid');

const items = [
	{
		id: 1,
		title: 'Dillon Boy',
		date: '2020-04-09',
		auction_end: '2020-10-01',
		price: 29,
		bidder: 'henk3',
		img: './images/auction1.jpg',
		location: 'Utrecht',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 2,
		title: 'The human eye',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 19,
		bidder: 'henk3',
		img: './images/auction2.jpg',
		location: 'utrecht',
		technique: 'digital',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 3,
		title: 'The human eye2',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 60,
		bidder: null,
		img: './images/auction3.jpg',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 4,
		title: 'The human eye3',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: 'henk',
		img: './images/auction4.jpg',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 5,
		title: 'jungle demon',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction5.jpg',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 6,
		title: 'socrates',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction6.jpg',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: uuidv4(),
		title: 'nietszche',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction7.jpg',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: uuidv4(),
		title: 'locke',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction8.jpg',
		location: 'Deventer',
		technique: 'digital',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: uuidv4(),
		title: 'The human eye5',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction9.jpg',
		location: 'Deventer',
		technique: 'Metal',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	}
];

module.exports = items;
