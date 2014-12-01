var passport = require('passport'),
	passportTwitter = require('passport-twitter'),
	TwitterStrategy = passportTwitter.Strategy;
	//TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user.js');

var twitterConnection = function (server) {
	console.log('Twitter connection ready');

	passport.use(new TwitterStrategy({
		consumerKey: 'dtQ2TFHwuRGM2xsvMpECcyOPh',
		consumerSecret: 'R8gNLwCnj6jL7CEoIzKls3uEU9rTAzgcH7SpkOBHyEb0ScWqgn',
		callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
	}, function (token, tokenSecret, profile, done){

		var user = new User({
			username : profile.username,
			twitter : profile
		});
		//Por si hay error
		user.save(function (err){
			if(err){
				done(err, null);
				return;
			}

			done(null, profile);
		});
	}));

	server.get('/auth/twitter', passport.authenticate('twitter'));

	server.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/?error=algo-fallo'}),
	function (req, res){
		res.redirect('app/');
	});
};

module.exports = twitterConnection;