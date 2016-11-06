var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
	name: String,
	province: String,
	available_tickets: Number,
	description: String,
	sold_tickets: Number,
	ticket_price: Number
});

mongoose.model('Event', EventSchema);
