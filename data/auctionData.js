const { v4: uuidv4 } = require('uuid');

const items = [
	{
		id: 1,
		title: 'Dillon Boy',
		auction_end: '2020-10-01',
		bids:[
			{
				bidder: 'henk',
				time: '14:03',
				amount: 20,
				date: '2020-04-09'
			}

		],
		img: 'public/auction1.jpg',
		location: 'Utrecht',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 2,
		title: 'eye',
		auction_end: '2020-12-09',
		bids:[
			{
				bidder: 'henk',
				time: '14:03',
				amount: 20,
				date: '2020-04-09'
			},
			{
				bidder: 'henk3',
				time: '14:03',
				amount: 30,
				date: '2020-04-09'
			},
		],
		img: 'public/auction3.jpg',
		location: 'utrecht',
		technique: 'digital',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 3,
		title: 'The human eye2',
		auction_end: '2020-11-09',
		bids:[
			{
				bidder: 'henk3',
				time: '14:03',
				amount: 20,
				date: '2020-04-09'
			},
			{
				bidder: 'henk',
				time: '14:03',
				amount: 30,
				date: '2020-04-09'
			},
		],
		img: 'public/auction3.jpg',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 4,
		title: 'The human eye3',
		auction_end: '2020-12-09',
		bids:[
			{
				bidder: 'henk',
				time: '14:03',
				amount: 20,
				date: '2020-04-09'
			},
			{
				bidder: 'henk3',
				time: '14:03',
				amount: 30,
				date: '2020-04-09'
			},
		],
		img: 'public/auction4.png',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 5,
		title: 'jungle demon',
		auction_end: '2020-12-09',
		bids:[
			{
				bidder: 'henk',
				time: '14:03',
				amount: 20,
				date: '2020-04-09'
			},
			{
				bidder: 'henk3',
				time: '14:03',
				amount: 30,
				date: '2020-04-09'
			},
		],
		img: 'public/auction4.png',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: 6,
		title: 'socrates',
		auction_end: '2020-12-09',
		bids:[
			{
				bidder: 'henk3',
				time: '14:03',
				amount: 20,
				date: '2020-04-09'
			},
			{
				bidder: 'henk',
				time: '14:03',
				amount: 30,
				date: '2020-04-09'
			},
		],
		img: 'public/auction4.png',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: uuidv4(),
		title: 'nietszche',
		auction_end: '2020-12-09',
		bids:[
			{
				bidder: 'henk',
				time: '14:03',
				date: '2020-04-09',
				amount: 20
			},
			{
				bidder: 'henk3',
				time: '14:03',
				date: '2020-04-09',
				amount: 30
			},
		],
		img: 'public/auction7.jpg',
		location: 'Deventer',
		technique: 'Bronze',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: uuidv4(),
		title: 'locke',
		auction_end: '2020-12-09',
		bids:[
			{
				bidder: 'henk',
				time: '14:03',
				amount: 20,
				date: '2020-04-09'
			},
			{
				bidder: 'henk3',
				time: '14:03',
				amount: 30,
				date: '2020-04-09'
			},
		],
		img: 'public/auction8.jpg',
		location: 'Deventer',
		technique: 'digital',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	},
	{
		id: uuidv4(),
		title: 'The human eye5',
		auction_end: '2020-12-09',
		bids:[
			{
				bidder: 'henk',
				time: '14:03',
				amount: 20,
				date: '2020-04-09'
			},
			{
				bidder: 'henk3',
				time: '14:03',
				amount: 30,
				date: '2020-04-09'
			},
		],
		img: 'public/auction9.jpg',
		location: 'Deventer',
		technique: 'Metal',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'
	}
];

module.exports = items;
