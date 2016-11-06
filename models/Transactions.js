var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
	username: String,
	genre: Boolean,
	province: String,
	event: String,
	ticket_price: Number,
	tickets: Number
});

mongoose.model('Transaction', TransactionSchema);
