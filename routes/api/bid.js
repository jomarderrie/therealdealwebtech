let items = require('../../data/auctionData');
const express = require('express');
const { Router } = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const StatusCodes = require('http-status-codes');

// @route    POST api/bid/:id
// @desc     I want to be able to place a bid on an auction
// @access   Private

router.post('/', auth, (req, res) => {
	let itemId = req.body.id;
	let username = req.user.username;
	let bid = req.body.bid;
	let indexItem;

	//lets first try to find the item.
	let item = items.find(({ id }, index) => {
		indexItem = index;
		return id === parseInt(itemId);
	});

	//if the item hasnt been found item not found message
	if (item === undefined) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Item not' +
				' found' });
	}

	//lets check if the auction already has ended.
	let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
	let itemDate = parseInt(item.auction_end.split('-').join(''));
	if (itemDate < now) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'The auction' +
				' already ended' });
	}

	//lets check if the user was the last bidder on the auction
	if (item.bidder === username) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'You' +
				' were the' +
				' list bidder on the auction bid again later!' });
	}

	//check if bid is valid
	if (bid !== undefined) {
		let parsedBid = parseInt(bid);
		if (Number.isNaN(parsedBid)) {
			res.status(StatusCodes.NOT_FOUND).json({ error: 'Invalid number' +
					' filled in try to fill in a good' +
					' bid' });
		}
		if (item.price >= bid) {
			return res.status(StatusCodes.NOT_FOUND).json({ msg: 'the bid' +
					' price is lower then the last bid' });
		}
		//everything seems fine lets find and update the auction
		items[indexItem] = {
			...item,
			price: req.body.bid,
			bidder: req.body.username
		};
		return res.status(StatusCodes.OK).json({ item: items[indexItem] });
	}

	// if the bid is empty error
	if (bid === undefined){
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'No bidding was put in' });
	}

	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal' +
			' server error' });
});

// @route    DELETE api/bid/:id
// @desc     I want to be able to remove my bid
// @access   Private
router.delete( "/",auth, (req, res) => {
	let itemId = req.body.id;
	let username = req.user.username;
	let indexItem;

	//lets first try to find the item.
	let item = items.find(({ id }, index) => {
		indexItem = index;
		return id === parseInt(itemId);
	});

	//if the item hasnt been found item not found message
	if (item === undefined) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Item not' +
				' found' });
	}

	//lets first check if the user is the actually admin if so remove it because admin can do everything
	if (req.user.role === 'admin') {
		//find the item and reset the values
		items[indexItem] = {
			...item,
			bidder: null,
			price: 0
		};
		return res.status(StatusCodes.OK).json({ item: items[indexItem] });
	}

	//lets check if the auction already has ended.
	let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
	let itemDate = parseInt(item.auction_end.split('-').join(''));
	if (itemDate < now) {
		return res.status(404).json({ error: 'The auction' +
				' already ended' });
	}
	//lets check if the user was the last bidder on the auction
	if (item.bidder === username) {
		return res.status(404).json({ error: 'You werent' +
				' the list bidder' });
	}

	//looks like everything is fine
	items[indexItem] = {
		...item,
		bidder: null,
		price: 0
	};
	return res.status(StatusCodes.OK).json({ item: items[indexItem] });

});



module.exports = router;
