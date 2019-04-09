const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const users = require('../models/users.model');
const masterPieces = require('../models/masterpieces.model');

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

router.get('/gallery', (req, res) => {
	masterPieces.find({}, (err, docs) => {
		if (err) return res.json({success: false, err});
		return res.json({success: true, data: docs});
	})
})


router.post('/addPicture',  (req, res) => {
	
	const {nickname, id} = res.locals.decoded;
	const base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
	const filePath = `uploads/${nickname}-${new Date().getTime()}.png`
	fs.writeFile(filePath, base64Data, 'base64', function(err) {
		if(err){
		   console.log(err);
		 }
	});
	const newMasterPiece = new masterPieces({userID: id, imagePath: filePath});
	newMasterPiece.save().then(piece => res.json({success: true, masterpiece: piece}));
})


module.exports = router;