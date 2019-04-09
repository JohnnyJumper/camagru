const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
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


router.post('/addPicture',  (req, res) => {
	
	console.log('req = ', req.body.base64);

	const base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
	fs.writeFile(`uploads/test.png`, base64Data, 'base64', function(err) {
		if(err){
		   console.log(err);
		 }
	});
	res.json({success: true, req: req.body});
})


module.exports = router;