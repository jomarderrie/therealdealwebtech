let auction_items = require('../../data/auctionData');

const StatusCodes = require('http-status-codes');
const express = require('express');
const { Router } = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { v4: uuidv4 } = require('uuid');

const jwt = require('jsonwebtoken');
// @route    GET api/auction/
// @desc     Display a list of auctionable products or services. It should be possible to search the list of auctions with logical filters.
// @access Public
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
			return title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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

	//if none of parameters are defined --> give all the items.
	//else if the search didnt find us anything --> error no items found
	//else give the items found --> show the found items
	if (search === undefined && location === undefined && price === undefined && technique === undefined) {
		res.status(StatusCodes.OK).json({ auctionItems: auctionItems });
	} else if (auctionItems.length === 0) {
		//return empty array
		res.status(StatusCodes.NOT_FOUND).json({ NoItemsFound: 'No auction items found' });
	} else {
		res.status(StatusCodes.OK).json({ auctionItems: auctionItems });
	}
});

// @route    GET api/auction/won
// @desc     I want to see a list of all auctions I won
// @access   Public
router.get('/won', auth, (req, res) => {
	let auctionItems = [ ...auction_items ];
	//check if the auction ended and if the user matches
	let wonItems = auctionItems.filter((item) =>
											((item.bidder === req.user.username) &&
												(parseInt(item.auction_end.split('-').join(''))<parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, '')))));

	if (wonItems.length === 0) {
		return res.status(StatusCodes.NOT_FOUND).json({ NoItemsFound: 'No won auction item found' });
	} else {
		return res.status(StatusCodes.OK).json({ wonAuctionItems: wonItems });
	}
});

// @route    GET api/auction/:id
// @desc     get an element with an certain id
// @access   Public
router.get("/:name", (req,res) =>{
	let  title2  = req.params.name;
	let auctionItems2 = [ ...auction_items ];
	console.log(title2)
	//search for auctionItems with a given keyword in it
	auctionItems2 = auctionItems2.filter(({ title }) => {
		return (title.toLowerCase().indexOf(title2.toLowerCase())) !== -1;
		});

	if (auctionItems2.length>0 && auctionItems2.length<auction_items.length){
		return res.status(StatusCodes.OK).json({'auctionItems': auctionItems2})
	}else{
		return res.status(StatusCodes.NOT_FOUND).json({ NoItemsFound: 'No Item Found' });
	}
})

// @route    POST api/auction/
// @desc     I want to add new auctions as a admin.
// @access   Private
router.post('/', auth, (req, res) => {
	const { title, auction_end, img, location, technique } = req.body;
	let responseObject = [];
	//lets first check if we actually have an admin
	if (req.user.role !== 'admin') {
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Not admin Not alowed' });
	}

	//if not all parameters are send in send invalid request
	if (
		title === undefined ||
		location === undefined ||
		technique === undefined ||
		img === undefined ||
		auction_end === undefined
	) {
		return res.status(StatusCodes.BAD_REQUEST).json({ error: 'bad request not all fields filled in ' });
	}

	let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
	let itemDate = parseInt(auction_end.split('-').join(''));

	if (itemDate < now) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'The auction' +
				' already ended' });
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
	res.status(StatusCodes.OK).json({ AddedItem: responseObject });
});

// @route    POST api/auction/
// @desc     I want to delete auctions as a admin.
// @access   Private
router.delete('/', auth, (req, res) => {
	let indexItem;
	let itemId = req.body.id;

	//lets first check if we actually have an admin
	if (req.user.role !== 'admin') {
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Not admin' +
				' Not alowed' });
	}

	//lets find the item
	let item = auction_items.find(({ id }, index) => {
		indexItem = index;
		return id === parseInt(itemId);
	});

	//if there is no item no item found
	if (item === undefined) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Item not' +
				' found' });
	}

	//return the items
	auction_items = auction_items.filter((item) => parseInt(item.id) !== parseInt(itemId));
	return res.status(StatusCodes.OK).json({ items: auction_items });
});



// @route    PUT api/auction/
// @desc     I want to modify auctions as a admin.
// @access   Private
router.put('/', auth, (req, res) => {
	let indexItem;
	let itemId = req.body.id;

	//lets first check if we actually have an admin
	if (req.user.role !== 'admin') {
		return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Not admin' +
				' Not alowed' });
	}

	//lets find the item
	let item = auction_items.find(({ id }, index) => {
		indexItem = index;
		return id === parseInt(itemId);
	});
	//if there is no item no item found
	if (item === undefined) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Item not' +
				' found' });
	}
	if(Object.keys(req.body).length < 2){
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Nothing to change '
				 });
	}
	//the keys on which we want to check on
	let keys = [ 'title', 'auction_end', 'img', 'location', 'technique', 'price' ];
	//lets change the array
	Object.keys(req.body).forEach((key) => {
		if (keys.includes(key)){
			auction_items[indexItem][key] = req.body[key];
		}
	});

	res.status(StatusCodes.OK).json({ auction_items: auction_items[indexItem] });
});




module.exports = router;
