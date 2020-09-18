let items = require('../../data/auctionData');
const express = require('express');
const { Router } = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route    POST api/bid/:id
// @desc     I want to be able to place a bid on an auction
// @access   Private

router.post('/:id', auth, (req, res) => {
	let itemId = req.params.id;
	let username = req.user.username;
	let bid = req.body.bid;
	let indexItem;
	// console.log(items[0]);
	// console.log(itemId);
	//lets first try to find the item.
	let item = items.find(({ id }, index) => {
		indexItem = index;
		return id === parseInt(itemId);
	});
	// console.log(item);
	//if the item hasnt been found item not found message
	if (item === undefined) {
		return res.status(404).json({ msg: 'Item not found' });
	}

	//lets check if the auction already has ended.
	let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
	let itemDate = parseInt(item.auction_end.split('-').join(''));
	if (itemDate < now) {
		return res.status(404).json({ msg: 'The auction already ended' });
	}

	//lets check if the user was the last bidder on the auction
	if (item.bidder === username) {
		return res.status(404).json({ msg: 'You were the list bidder on the auction bid again later!' });
	}

	//check if bid is valid
	if (bid !== undefined) {
		let parsedBid = parseInt(bid);
		if (Number.isNaN(parsedBid)) {
			res.status(404).json({ error: 'Invalid number filled in' });
		}
		if (item.price >= bid) {
			return res.status(404).json({ msg: 'the bid price is lower then the last bid' });
		}
		//everything seems fine lets find and update the auction
		items[indexItem] = {
			...item,
			price: req.body.bid,
			bidder: req.body.username
		};
		return res.status(200).json({ msg: 'ok' });
	}
	res.status(500).json({ msg: 'Internal server error' });
});

// @route    DELETE api/bid/:id
// @desc     I want to be able to remove my bid
// @access   Private
router.delete('/:id', auth, (req, res) => {
	console.log('hey');
	let itemId = req.params.id;
	let username = req.user.username;
	let indexItem;

	//lets first try to find the item.
	let item = items.find(({ id }, index) => {
		indexItem = index;
		return id === parseInt(itemId);
	});

	//if the item hasnt been found item not found message
	if (item === undefined) {
		return res.status(404).json({ msg: 'Item not found' });
	}

	//lets first check if the user is
	//  actually an admin if so remove it because admin can do everything
	if (req.user.role == 'admin') {
		//find the item and reset the values
		items[indexItem] = {
			...item,
			bidder: null,
			price: 0
		};
		return res.status(200).json({ msg: 'ok' });
	}

	//lets check if the auction already has ended.
	let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
	let itemDate = parseInt(item.auction_end.split('-').join(''));
	if (itemDate < now) {
		return res.status(404).json({ msg: 'The auction already ended' });
	}
	//lets check if the user was the last bidder on the auction
	if (item.bidder === username) {
		return res.status(404).json({ msg: 'You werent the list bidder' });
	}
});

module.exports = router;
