const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: String,
	password: String,
	nickname: String,
	confirmEmail: Boolean
});


module.exports = mongoose.model('user', userSchema);