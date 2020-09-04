const express = require('express');
const router = express.Router();
//use bcrypt

// @route GET /user

router.get('/user', (req, res) => {
	res.json({ msg: 'hey' });
});

module.exports = router;
