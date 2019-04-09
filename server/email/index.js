const nodemailer = require('nodemailer');
const keys = require('../config/keys');

const send = (adressant, token) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: keys.email
	});

	const mailOptions = {
		from: 'johnvolt32@gmail.com',
		to: adressant,
		subject: 'confirm camagru registration',
		text: `http://localhost:6357/auth/confirm/${token}`
	}

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
			console.log(error);
			return {success: false, err};
		} else {
			console.log('Email sent: ' + info.response);
			return {success:true}; 
		}
	  });
}

module.exports = send;