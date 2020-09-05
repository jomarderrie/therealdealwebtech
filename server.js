const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
//bring routes
const userAuctionRoutes = require('./routes/api/user');
const itemAuctionRoutes = require('./routes/api/auction');
const bidRoute = require('./routes/api/bid');
//app
const app = express();

//bodyparser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true
	})
);
// routes middleware
app.use('/user', userAuctionRoutes);
app.use('/auction', itemAuctionRoutes);
app.use('/bid', itemAuctionRoutes);
//routes

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
