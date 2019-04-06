const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token) {
		if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
		jwt.verify(token, keys.JWTsecret, (err, decoded) => {
			if (err) return res.json({success: false, message: 'token is not valid', err})
			else {
				res.locals.decoded = decoded;
				next();
			}
		});
	} else return res.json({success: false, message: 'Auth token is not supplied'});
}


module.exports = {
	checkToken
}
