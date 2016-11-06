var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var Transaction = mongoose.model('Transaction');

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

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res) {
  res.json(req.post);
});

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
