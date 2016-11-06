var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
	username: String,
	events: String,
	tickets: Number
});

mongoose.model('Transaction', TransactionSchema);
