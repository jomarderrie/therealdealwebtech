const { v4: uuidv4 } = require('uuid');

const items = [
	{
		id: 1,
		title: 'Dillon Boy - Superman',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 29,
		bidder: 'henk',
		img: './images/auction1.jpg',
		location: 'Utrecht',
		technique: 'Bronze'
	},
	{
		id: 2,
		title: 'The human eye, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 19,
		bidder: null,
		img: './images/auction2.jpg',
		location: 'utrecht',
		technique: 'digital'
	},
	{
		id: 3,
		title: 'The human eye, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 60,
		bidder: null,
		img: './images/auction3.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: 4,
		title: 'The human eye, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: 'henk',
		img: './images/auction4.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: 5,
		title: 'jungle demon, illustration Digital Image, 64',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction5.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'socrates, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction6.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'nietszche, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction7.jpg',
		location: 'Deventer',
		technique: 'Bronze'
	},
	{
		id: uuidv4(),
		title: 'locke, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction8.jpg',
		location: 'Deventer',
		technique: 'Ink drawing'
	},
	{
		id: uuidv4(),
		title: 'The human eye, Old medical atlas, illustration Digital Image, 64',
		date: '2020-04-09',
		auction_end: '2020-12-09',
		price: 49,
		bidder: null,
		img: './images/auction9.jpg',
		location: 'Deventer',
		technique: 'Metal'
	}
];

module.exports = items;
