let items = require('../../data/auctionData');
const express = require('express');
const { Router } = require('express');
const router = express.Router();

// @route    GET api/auction
// @desc     Display a list of auctionable products or services
// @access   Public

router.get('', (req, res) => {
	res.json({ auctions: { items } });
});

// @route    GET api/auction/:search
// example search :search="socrates"?Price=50&location=utrecht&technique=bronze
// @desc     It should be possible to search the list of auctions with logical filters
// @access   Public

router.get('/:search', (req, res) => {
	//search query
	let queryString = req.params.search;
	//location
	let locationQuery = req.query.location;
	//price
	let priceQuery = req.query.price;
	//technique
	let techniqueQuery = req.query.technique;

	items = items.filter(({ title }) => {
		return title.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
	});

	if (locationQuery !== undefined) {
		items = items.filter(({ location }) => {
			return locationQuery.toLowerCase() === location.toLowerCase();
		});
	}

	if (priceQuery !== undefined) {
		priceQuery = parseInt(priceQuery);
		if (Number.isNaN(priceQuery)) {
			console.log(priceQuery);
			res.status(404).json({ error: 'Invalid number filled in' });
		}
		items = items.filter(({ price }) => {
			return price <= priceQuery;
		});
	}
	console.log(techniqueQuery);
	if (techniqueQuery !== undefined) {
		items = items.filter(({ technique }) => {
			return techniqueQuery.toLowerCase() === technique.toLowerCase();
		});
	}

	if (items.length === 0) {
		res.status(404).json({ error: 'No items founds' });
	} else {
		res.status(200).json({ items: items });
	}
});

module.exports = router;
