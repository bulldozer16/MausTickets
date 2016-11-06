var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	type: String,
	username: String,
	password: String,
	name: String,
	last_name: String,
	genre: Boolean,
	province: String,
	canton: String,
	card_number: Number,
	expire_date: String,
	age: Number,
	artists: String,
	teams: String,
	picture: String
});

mongoose.model('User', UserSchema);
