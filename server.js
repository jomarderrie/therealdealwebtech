const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
//bring routes
const authRoute = require('./routes/api/auth');
const auctionRoute = require('./routes/api/auction');
const bidRoute = require('./routes/api/bid');
const registerRoute = require('./routes/api/user');
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
app.use('/auction', auctionRoute);
app.use('/bid', bidRoute);
app.use('/register', registerRoute);
//routes

app.get('/', (req, res) => {
	res.send('Hello welcome by assigment1!');
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
