const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const users = require('../models/users.model');
const tokens = require('../models/tokens.model');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const {checkToken} = require('../middleware/middleware');

router.get('/checkAuth', checkToken, (req, res) => {
	return res.json({success: true});
})

router.post('/login', async (req, res) => {
	const {email, password} = req.body;
	const user = await users.findOne({email});
	const {nickname, id}  = await user;
	const match = bcrypt.compare(password, user.password);
	if (match && email === user.email) {
		// generate new accessToken, save it to db, send it back to user
		const token = jwt.sign({email, nickname, id}, keys.JWTsecret, { expiresIn: '24h'});

		// if such user has token replace it otherwise create a new one: 
		const userToken = await tokens.findOne({userID: id});
		if (userToken) {
			userToken.accessToken = token;
			userToken.save().then(() => res.json({success: true, accessToken: token}));			
		} else {
			const newToken = new tokens({userID: id, accessToken: token});
			newToken.save().then(() => res.json({success: true, accessToken: token}));
		}
	} else  return res.send(403).json({success: false, message: 'Incorect username or password'});
});


router.post('/reg', (req, res) => {
	const {email, password, nickname} = req.body;

	if (!email || !password || !nickname) return res.json({err: 'wrong input', data: req.body});
	bcrypt.hash(password, saltRounds,  (err, hash)  => {
		if (err) return res.json({success: false, err, data: req.body})
		const newUser = new users({email, password: hash, nickname});
		newUser.save().then((user) => res.json({success:true}));
	})
})

module.exports = router;