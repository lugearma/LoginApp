var _ = require('underscore');

var homeController = function function_name (server, users) {
	console.log('homeController esta cargado');

	var isLoggedIn = function (req, res, next){
	if(req.session.user){
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
		users = _.without(users, req.session.user);

		server.io.broadcast('log-out', { username: req.session.user });
		
		req.session.destroy();
		res.redirect('/');
	});

	server.post('/log-in', function (req, res) {
		users.push(req.body.username);
		req.session.user = req.body.username;
		//Todos los usuarios
		server.io.broadcast('log-in', { username: req.session.user });
		res.redirect('/app');
	});
};

module.exports = homeController;