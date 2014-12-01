var Users = require('../models/user.js'),
	Post = require('../models/post.js'),
	_ = require('underscore');

var appController = function (server, users) {
	console.log('appController esta cargado');

	var isntLoggerIn = function (req, res, next){
		if(!req.session.passport.user){
			res.redirect('/');
			return;
		}
		next();
	};

	var getUser= function (req, res, next){
		Users.findOne({ username: req.session.passport.user.username }, function (err, user){
			req.user = user
			next();
		});
	};

	//Antes de que entre  la funcion checa si esta logeado
	server.get('/app', isntLoggerIn, function (req, res){
		Post.find({})
		.populate('user')
		.exec(function (err, posts) {
			
			var postsAsJson = _.map(posts, function (post){
				return post.toJSON();
			});

			res.render('app', {
				user: req.session.passport.user,
				users: users,
				posts: postsAsJson
			});
		});
	});

	server.post('/app/create-post', isntLoggerIn, getUser, function (req, res){
		var post = new Post({
			content : req.body.content,
			user : req.user
		});

		post.save(function (err){
			if(err){
				res.send(500, err);
			}

			server.io.broadcast('post', {
				content : post.content,
				user : req.user.toJSON()
			});

			res.redirect('/app');
		});
	});
};

module.exports = appController;