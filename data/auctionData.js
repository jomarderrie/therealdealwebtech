const { v4: uuidv4 } = require('uuid');

const items = [
	{
		id: uuidv4(),
		title: 'Dillon Boy - Superman',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 29,
		last_bidder: null,
		img: './images/auction1.jpg',
		location: 'Utrecht',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'The human eye, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 19,
		last_bidder: null,
		img: './images/auction2.jpg',
		location: 'utrecht',
		technique: 'digital'
	},
	{
		id: uuidv4(),
		title: 'The human eye, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 60,
		last_bidder: null,
		img: './images/auction3.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'The human eye, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 49,
		last_bidder: null,
		img: './images/auction4.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'jungle demon, illustration Digital Image, 64',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 49,
		last_bidder: null,
		img: './images/auction5.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'socrates, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 49,
		last_bidder: null,
		img: './images/auction6.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'nietszche, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 49,
		last_bidder: null,
		img: './images/auction7.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'locke, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 49,
		last_bidder: null,
		img: './images/auction8.jpg',
		location: 'Deventer',
		technique: 'Ink drawing'
	},
	{
		id: uuidv4(),
		title: 'The human eye, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-9',
		auction_end: '2020-12-9',
		price: 49,
		last_bidder: null,
		img: './images/auction9.jpg',
		location: 'Deventer',
		technique: 'Metal'
	}
];

module.exports = items;
