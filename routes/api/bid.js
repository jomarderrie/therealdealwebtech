let items = require('../../data/auctionData');
const express = require('express');
const { Router } = require('express');
const router = express.Router();

// @route    POST api/bid/:id
// example search :search="socrates"?Price=50&location=utrecht&technique=bronze
// @desc     I want to be able to place a bid on an auction
// @access   Private

router.post('/:id', (req, res) => {
	let itemId = req.params.id;
	let username = req.body.username;
	//lets first try to find the item.
	let item = items.filter(({ id }) => {
		console.log(id);
		return id === itemId;
	});

	//if the item hasnt been found item not found message
	if (item) {
		return res.status(404).json({ msg: 'Item not found' });
	}

	//lets place a bid on the item
	if (item.last_bidder === username) {
	}
});

module.exports = router;
