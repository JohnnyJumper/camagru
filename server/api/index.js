const express = require('express');
const router = express.Router();
const fs = require('fs');
const users = require('../models/users.model');
const masterPieces = require('../models/masterpieces.model');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const sendEmail = require('../email');

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

router.get('/picture/:id', (req, res) => {
	const {id} = req.params;

	if (!id) return res.json({success: false, err: "No such picture in database"});
	masterPieces.findById(id, (err, doc) => {
		if (err) return res.json({success: false, err});
		return res.json({success: true, data: doc});
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

router.post('/editProfile', async (req, res) => {
	const {email: userEmail} = res.locals.decoded;
	const {email, nickname, password} = req.body;

	const user = await users.findOne({email: userEmail});
	if (nickname) {
		user.nickname = nickname
	}

	if (email) {
		user.email = email
		user.confirmEmail = false;
		const token = jwt.sign({email}, keys.JWTsecret, { expiresIn: '1h'});
		sendEmail(email, token, "newUser");
	}

	if (password) {
		bcrypt.hash(password, saltRounds,  (err, hash)  => {
			if (err) return res.json({success: false, err})
			user.password = hash;
			user.save();
		})
	}
	user.save().then(() => res.json({success: true}));

})


module.exports = router;
