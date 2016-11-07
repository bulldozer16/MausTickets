var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Transaction = mongoose.model('Transaction');

router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

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
	var query = User.find( {'username':req.body.username, 'password':req.body.password}, {'type':1} );//.count();

	query.exec(function (err, user) {
    	if (err) { return next(err); }
    	
	var u = 0;
	
	try 
	{
		if (user[0].type == "Admin") {u = 1;}
		else if (user[0].type == "User") {u = 2;}
		else {u = 0;}
	} 
	catch (err) 
	{
		u = 0;
	}

    	res.json(u);
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

// Entradas adquiridas para evento A por provincia del cliente

router.post('/transactions/tickets_province', function(req, res, next) {
	var name = req.body.name;
	var query = Transaction.find( {'event':name }, {'tickets':1, 'province':1} );

	query.exec(function (err, r) {
    	if (err) { return next(err); }

	var San_Jose = 0;
	var Alajuela = 0;
	var Cartago = 0;
	var Heredia = 0;
	var Limon = 0;
	var Guanacaste = 0;
	var Puntarenas = 0;

	for (var data of r)
	{
		if (data.province == "San Jose") {San_Jose += data.tickets;}
		else if (data.province == "Alajuela") {Alajuela += data.tickets;}
		else if (data.province == "Cartago") {Cartago += data.tickets;}
		else if (data.province == "Heredia") {Heredia += data.tickets;}
		else if (data.province == "Limon") {Limon += data.tickets;}
		else if (data.province == "Guanacaste") {Guanacaste += data.tickets;}
		else {Puntarenas += data.tickets;}
	}

	var response = {'San_Jose':San_Jose, 
			'Alajuela':Alajuela, 
			'Cartago':Cartago,
			'Heredia':Heredia,
			'Limon':Limon,
			'Guanacaste':Guanacaste,
			'Puntarenas':Puntarenas};
	res.json(response);

	});
});

// Ventas por evento

router.get('/transactions/sales_by_event', function(req, res, next) {
	var query = Transaction.aggregate([{$group:{_id:{event:"$event"},
						totalAmount:{$sum:{$multiply:["$ticket_price","$tickets"]}},}}]);

	query.exec(function (err, r) {
    	if (err) { return next(err); }

	var response = [];

	for (var data of r)
	{
		var row = {'event':data._id.event, 'sale':data.totalAmount};
		response.push(row);
	}


	res.json(response);

	});	
});

// Ventas por cliente

router.get('/transactions/tickets_by_client', function(req, res, next) {
	var query = Transaction.aggregate([{$group:{_id:{user:"$username"},
      							tickets:{$sum:"$tickets"},}}]);

	query.exec(function (err, r) {
    	if (err) { return next(err); }

	var response = [];

	for (var data of r)
	{
		var row = {'username':data._id.user, 'tickets':data.tickets};
		response.push(row);
	}


	res.json(response);

	});	
});

// Ventas por provincia

router.get('/transactions/sales_by_province', function(req, res, next) {
	var query = Transaction.find( {}, {'tickets':1, 'ticket_price':1, 'province':1} );

	query.exec(function (err, r) {
    	if (err) { return next(err); }

	var San_Jose = 0;
	var Alajuela = 0;
	var Cartago = 0;
	var Heredia = 0;
	var Limon = 0;
	var Guanacaste = 0;
	var Puntarenas = 0;

	for (var data of r)
	{
		if (data.province == "San Jose") {San_Jose += (data.tickets * data.ticket_price);}
		else if (data.province == "Alajuela") {Alajuela += (data.tickets * data.ticket_price);}
		else if (data.province == "Cartago") {Cartago += (data.tickets * data.ticket_price);}
		else if (data.province == "Heredia") {Heredia += (data.tickets * data.ticket_price);}
		else if (data.province == "Limon") {Limon += (data.tickets * data.ticket_price);}
		else if (data.province == "Guanacaste") {Guanacaste += (data.tickets * data.ticket_price);}
		else {Puntarenas += (data.tickets * data.ticket_price);}
	}

	var response = {'San Jose':San_Jose, 
			'Alajuela':Alajuela, 
			'Cartago':Cartago,
			'Heredia':Heredia,
			'Limon':Limon,
			'Guanacaste':Guanacaste,
			'Puntarenas':Puntarenas};

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
