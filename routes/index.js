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

router.param('name', function(req, res, next, name) {
	var query = Event.find( {'name':name} );

	query.exec(function (err, event) {
    	if (err) { return next(err); }
    	if (!event) { return next(new Error('Can\'t find event')); }

    	req.event = event;
    	return next();
  	});
});

router.put('/users', function(req, res, next) {
	var query = User.update({'username':req.body.username}, 
			{$set: {'type':req.body.type,
				'username':req.body.username,
				'password':req.body.password,
				'name':req.body.name,
				'last_name':req.body.last_name,
				'genre':req.body.genre,
				'province':req.body.province,
				'canton':req.body.canton,
				'card_number':req.body.card_number,
				'expire_date':req.body.expire_date,
				'age':req.body.age,
				'artists':req.body.artists,
				'teams':req.body.teams,
				'picture':req.body.picture}}).exec();
	res.json(req.body);
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

router.post('/users/login', function(req, res, next) {
	var query = User.find( {'username':req.body.username, 'password':req.body.password}, {'password':1} ).count();

	query.exec(function (err, user) {
    	if (err) { return next(err); }
    	
    	res.json(user);
  	});
});

router.get('/events/:name', function(req, res) {
  	res.json(req.user);
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

router.put('/events', function(req, res, next) {
	var query = Event.update({'name':req.body.name}, 
			{$set: {'name':req.body.name,
				'province':req.body.province,
				'available_tickets':req.body.available_tickets,
				'description':req.body.description,
				'sold_tickets':req.body.sold_tickets,
				'ticket_price':req.body.ticket_price}}).exec();
	res.json(req.body);
});

// Entradas adquiridas para evento A por sexo del cliente

router.post('/transactions/tickets_genre', function(req, res, next) {
	var name = req.body.name;
	var query = Transaction.find( {'event':name }, {'tickets':1, 'genre':1} );

	query.exec(function (err, r) {
    	if (err) { return next(err); }

	var dick = 0;
	var pussy = 0;
	for (var data of r)
	{
		if (data.genre) {dick += data.tickets;}
		else {pussy += data.tickets;}
	}

	var response = {male:dick, female:pussy};
	res.json(response);

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
