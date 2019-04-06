const express = require('express');
const router = express.Router();

const users = require('../models/users.model');

router.get('/user', (req, res) => {

	const {decoded: {email}} = res.locals;	
	let nickname = "unknown";
	users.findOne({email}, (err, doc) => {
		let success = false;
		if (!err) {
			success = true;
			nickname = doc.nickname;
		}
		return res.json({success, data: {nickname}});
	});
})



module.exports = router;