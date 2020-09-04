const express = require('express');
const port = 3000;

//bring routes
const userAuctionRoutes = require('./routes/api/user');
const itemAuctionRoutes = require('./routes/api/auction');
//app
const app = express();

// routes middleware
app.use('/user', userAuctionRoutes);
app.use('/auction', itemAuctionRoutes);

//routes

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
