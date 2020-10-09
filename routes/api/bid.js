let items = require('../../data/auctionData');
const express = require('express');
const {Router} = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const StatusCodes = require('http-status-codes');

// @route    POST api/bid/
// @desc     I want to be able to place a bid on an auction
// @access   Private

router.post('/', auth, (req, res) => {
    let itemId = (req.body.id);
    let username = req.user.username;
    let bid = req.body.bid;
    let indexItem;

    //lets first try to find the item.
    let item = items.find(({id}, index) => {
        indexItem = index;
        return id === (itemId);
    });


    //if the item hasnt been found item not found message
    if (item === undefined) {
        return res.status(StatusCodes.NOT_FOUND).json({
                                                          error: 'Item not' +
                                                              ' found'
                                                      });
    }
    if (bid === undefined) {
        return res.status(StatusCodes.NOT_FOUND).json({error: 'No bidding was put in'});
    }

    //lets check if the auction already has ended.
    let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
    let itemDate = items[indexItem].auction_end.split("-").join("");

    if (itemDate < now) {

        return res.status(StatusCodes.NOT_FOUND).json({
                                                          error: 'The auction' +
                                                              ' already ended'
                                                      });
    }
    //length will be used to check for the last bid on a
    // let bidsLength = items[indexItem - 1].bids.length;
    //lets check if the user was the last bidder on the
    // auction
    // console.log(items[indexItem].bids.slice(-1)[0]);
    if (items[indexItem].bids.slice(-1)[0].bidder === username) {

        return res.status(StatusCodes.NOT_FOUND).json({
                                                          error: 'You' +
                                                              ' were the' +
                                                              ' list bidder on the auction bid again later!'
                                                      });
    }

    //check if bid is valid
    if (bid !== undefined) {
        let parsedBid = parseInt(bid);

        if (Number.isNaN(parsedBid)) {

            return res.status(StatusCodes.NOT_FOUND).json({
                                                              error: 'Invalid number' +
                                                                  ' filled in try to fill in a good' +
                                                                  ' bid'
                                                          });
        }

        if (parseInt(items[indexItem].bids.slice(-1)[0].amount) >= bid) {
            return res.status(StatusCodes.NOT_FOUND).json({
                                                              error: 'the bid' +
                                                                  ' price is lower then the last bid'
                                                          });
        }

    }


    //everything seems fine lets find and update the
    // auction
    items[indexItem].bids.push({

                                   date: new Date().toISOString().slice(0, 10),
                                   time: new Date().toLocaleTimeString().slice(0, 5),
                                   amount: req.body.bid,
                                   bidder: username
                               });
    return res.status(StatusCodes.OK).json({item: items[indexItem]});


});

// @route    DELETE api/bid/
// @desc     I want to be able to remove my bid
// @access   Private
router.delete("/", auth, (req, res) => {
    let itemId = parseInt(req.body.id);
    let amount = parseInt(req.body.amount);
    let indexItem;
    let username = req.user.username;

    //lets first try to find the item.
    let item = items.find((item, index) => {
        indexItem = index;
        return parseInt(item.id) === itemId;
    });


    // if the item hasnt been found item not found message
    if (item === undefined) {
        return res.status(StatusCodes.NOT_FOUND).json({
                                                          error: 'Item not' +
                                                              ' found'
                                                      });
    }


    //lets first check if the user is the actually admin if
    // so remove it because admin can do everything
    let trintTex;
    if (req.user.role === 'admin') {
// items.bids[indexItem].bids.slice(0,1);
        items[indexItem].bids.forEach((item, index) => {
            if (item.amount === amount) {
                items[indexItem].bids[index] = {
                    ...item,
                    amount: 0
                }
            }
        })

        return res.status(StatusCodes.OK).json({"auctionitem": items});
    }

    console.log(items[indexItem])


    // lets check if the auction already has ended.
    let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
    let itemDate = parseInt(item.auction_end.split('-').join(''));
    if (itemDate < now) {
        return res.status(404).json({error: 'The auction' + ' already ended'});
    }

    items[indexItem].bids.forEach((item, index) => {
        if (item.bidder !== username){
            return res.status(404).json({error: 'Not you' +
                    'r auction'});
        }
        if (item.amount === amount) {
            items[indexItem].bids[index] = {
                ...item,
                amount: 0
            }
        }
        res.status(StatusCodes.OK).json({"msg":"deleted" +
                " item"});
    })

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'internal server error'});
});


module.exports = router;
