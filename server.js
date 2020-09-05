const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
//bring routes
const authRoute = require('./routes/api/auth');
const AuctionRoutes = require('./routes/api/auction');
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
app.use('/auth', authRoute);
app.use('/auction', AuctionRoutes);
app.use('/bid', bidRoute);
//routes

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
