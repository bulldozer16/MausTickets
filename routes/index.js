var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Transaction = mongoose.model('Transaction');

router.param('username', function(req, res, next, username) {
	var query = User.find( {'username':username} );

	query.exec(function (err, user) {
    	if (err) { return next(err); }
    	if (!user) { return next(new Error('Can\'t find user')); }

    	req.user = user;
    	return next();
  	});
});

router.get('/users/:username', function(req, res) {
  	res.json(req.user);
});

router.get('/users', function(req, res, next) {
	User.find(function(err, users) {
		if (err) { return next(err); }
    		res.json(users);
	});
});

router.post('/users', function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err, user) {
		if (err) { return next(err); }
    		res.json(user);
  	});
});

router.get('/events', function(req, res, next) {
	Event.find(function(err, events) {
		if (err) { return next(err); }
    		res.json(events);
	});
});

router.post('/events', function(req, res, next) {
	var event = new Event(req.body);
	event.save(function(err, event) {
		if (err) { return next(err); }
    		res.json(event);
  	});
});

router.get('/transactions', function(req, res, next) {
	Transaction.find(function(err, transactions) {
		if (err) { return next(err); }
    		res.json(transactions);
	});
});

router.post('/transactions', function(req, res, next) {
	var transaction = new Transaction(req.body);
	transaction.save(function(err, transaction) {
		if (err) { return next(err); }
    		res.json(transaction);
  	});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
