let auction_items = require('../../data/auctionData');

const express = require('express');
const { Router } = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { v4: uuidv4 } = require('uuid');

// @route    GET api/auction/:search
// @desc     Display a list of auctionable products or services. It should be possible to search the list of auctions with logical filters.
// @access   Public
// @param search
// @param price
// @param location
// @param technique

router.get('', (req, res) => {
	const { search, location, price, technique } = req.query;
	let auctionItems = [ ...auction_items ];

	//search for auctionItems with a given keyword in it
	if (search !== undefined) {
		auctionItems = auctionItems.filter(({ title }) => {
			return title.toLowerCase().indexOf(search.toLowerCase()) != -1;
		});
	}

	//location
	if (location !== undefined) {
		let lowerCaseLocation = location.toLowerCase();
		auctionItems = auctionItems.filter(({ location }) => {
			return lowerCaseLocation === location.toLowerCase();
		});
	}
	//price
	if (price !== undefined) {
		let parsedPrice = parseInt(price);
		if (Number.isNaN(parsedPrice)) {
			res.status(404).json({ error: 'Invalid number filled in' });
		}
		auctionItems = auctionItems.filter((item) => {
			return item.price <= parsedPrice;
		});
	}
	//technique
	if (technique !== undefined) {
		let techniqueLowerCase = technique.toLowerCase();
		auctionItems = auctionItems.filter(({ technique }) => {
			return techniqueLowerCase === technique.toLowerCase();
		});
	}

	//if nothing is defined lets give all the items.
	//else if the search didnt find us anything
	//else give the items found
	if (search === undefined && location === undefined && price === undefined && technique === undefined) {
		res.status(200).json({ auctionItems: auctionItems });
	} else if (auctionItems.length === 0) {
		//return empty array
		res.status(404).json({ error: 'No auction items founds' });
	} else {
		res.status(200).json({ auctionItems: auctionItems });
	}
});

// @route    GET api/auction/won
// @desc     I want to see a list of all auctions I won
// @access   Public
router.get('/won', auth, (req, res) => {
	let wonItems = auction_items.filter((item) => item.bidder === req.user.username);
	if (wonItems.length == 0) {
		res.status(404).json({ error: 'No won auction items founds' });
	} else {
		res.status(200).json({ wonAuctionItems: wonItems });
	}
});

// @route    POST api/auction/
// @desc     I want to add new auctions as a admin.
// @access   Private
router.post('/', auth, (req, res) => {
	const { title, auction_end, img, location, technique } = req.body;
	let responseObject = [];
	//lets first check if we actually have an admin
	if (req.user.role !== 'admin') {
		return res.status(404).json({ msg: 'Not admin Not alowed' });
	}

	//if not all parameters all valid in send invalid request
	if (
		title === undefined ||
		location === undefined ||
		technique === undefined ||
		img === undefined ||
		auction_end === undefined
	) {
		return res.status(404).json({ msg: 'bad request not all fields filled in ' });
	}

	let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
	let itemDate = parseInt(auction_end.split('-').join(''));
	if (itemDate < now) {
		return res.status(404).json({ msg: 'The auction already ended' });
	}

	//looks like everything is okay lets add the auction to the list of auctions.
	responseObject = {
		id: uuidv4(),
		title: title,
		date: new Date().toISOString().substr(0, 10),
		auction_end: auction_end,
		price: 0,
		bidder: null,
		img: img,
		location: location,
		technique: technique
	};

	auction_items.push(responseObject);
	res.status(201).json({ 'added action item': responseObject });
});

// @route    POST api/auction/
// @desc     I want to delete auctions as a admin.
// @access   Private
router.delete('/', auth, (req, res) => {
	let indexItem;
	let itemId = req.body.id;

	//lets first check if we actually have an admin
	if (req.user.role !== 'admin') {
		return res.status(404).json({ msg: 'Not admin Not alowed' });
	}
	//lets find the item
	let item = auction_items.find(({ id }, index) => {
		indexItem = index;
		return id === parseInt(itemId);
	});
	//if there is no item no item found
	if (item === undefined) {
		return res.status(404).json({ msg: 'Item not found' });
	}

	auction_items = auction_items.filter((item) => parseInt(item.id) !== parseInt(itemId));
	console.log(auction_items);
	return res.status(404).json({ items: auction_items });
});

// @route    PUT api/auction/
// @desc     I want to modify auctions as a admin.
// @access   Private
router.put('/', auth, (req, res) => {
	let indexItem;
	let itemId = req.body.id;
	const { title, auction_end, img, location, technique, id } = req.body;

	//lets first check if we actually have an admin
	if (req.user.role !== 'admin') {
		return res.status(404).json({ msg: 'Not admin Not alowed' });
	}

	//lets find the item
	let item = auction_items.find(({ id }, index) => {
		indexItem = index;
		return id === parseInt(itemId);
	});
	//if there is no item no item found
	if (item === undefined) {
		return res.status(404).json({ msg: 'Item not found' });
	}
	//the keys on which we want to check on
	let keys = [ 'title', 'auction_end', 'img', 'location', 'technique', 'price' ];
	//lets change the array
	Object.keys(req.body).forEach((key) => {
		if (keys.includes(key)) auction_items[indexItem][key] = req.body[key];
	});

	res.status(200).json({ auction_items: auction_items });
});

module.exports = router;
