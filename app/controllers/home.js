var _ = require('underscore');

var homeController = function function_name (server, users) {
	console.log('homeController esta cargado');

	var isLoggedIn = function (req, res, next){
	if(req.session.passport.user){
		res.redirect('/app');
		console.log('No esta loggeado');
		return;
	}
		next();
	};

	server.get('/', isLoggedIn, function (req, res) {
		res.render('home');
	});

	server.get('/log-out', function (req, res) {
		users = _.without(users, req.session.passport.user);

		server.io.broadcast('log-out', { username: req.session.passport.user.displayName });
		
		req.session.destroy();
		res.redirect('/');
	});

	server.post('/log-in', function (req, res) {
		users.push(req.session.passport.user.displayName);
		//req.session.passport.user = req.session.passport.user.displayName;
		//Todos los usuarios
		server.io.broadcast('log-in', { username: req.session.user.displayName });
		res.redirect('/app');
	});
};

module.exports = homeController;