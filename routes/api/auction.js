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
	let responseObject = [ ...items ];
	let resultArray = [];
	//search query
	let queryString = req.params.search;
	//location
	let locationQuery = req.query.location;
	//price
	let priceQuery = req.query.price;
	//technique
	let techniqueQuery = req.query.technique;

	responseObject = responseObject.filter(({ title }) => {
		return title.toLowerCase().indexOf(queryString.toLowerCase()) != -1;
	});

	if (locationQuery !== undefined) {
		responseObject = responseObject.filter(({ location }) => {
			return locationQuery.toLowerCase() === location.toLowerCase();
		});
	}

	if (priceQuery !== undefined) {
		priceQuery = parseInt(priceQuery);
		if (Number.isNaN(priceQuery)) {
			console.log(priceQuery);
			res.json({ error: 'Invalid number filled in' });
		}
		responseObject = responseObject.filter(({ price }) => {
			return price <= priceQuery;
		});
	}
	console.log(techniqueQuery);
	if (techniqueQuery !== undefined) {
		responseObject = responseObject.filter(({ technique }) => {
			return techniqueQuery.toLowerCase() === technique.toLowerCase();
		});
	}

	res.json({ searchedItems: responseObject });
});

module.exports = router;
