let items = require('../../data/auctionData');
const express = require('express');
const { Router } = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route    GET api/auction/:search
// @desc     Display a list of auctionable products or services. It should be possible to search the list of auctions with logical filters.
// @access   Public
// @param search
// @param price
// @param location
// @param technique

router.get('', (req, res) => {
	const { search, location, price, technique } = req.query;
	let auctionItems = [ ...items ];

	//search for auctionItems with a given keyword in it
	if (search !== undefined) {
		auctionItems = auctionItems.filter(({ title }) => {
			console.log(search.toLowerCase());
			return title.toLowerCase().indexOf(search.toLowerCase()) != -1;
		});
	}

	//location
	if (location !== undefined) {
		let lowerCaseLocation = location.toLowerCase();
		auctionItems = auctionItems.filter(({ location }) => {
			console.log(location);
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
		console.log(techniqueLowerCase);
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
// @route    GET api/auction/:search
router.get('/won', auth, (req, res) => {
	console.log('hello');
	// console.log(req.body.username);
	// res.json(items.filter((item) => item.username === req.user.username));
});

module.exports = router;
