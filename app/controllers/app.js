var appController = function (server, users) {
	console.log('appController esta cargado');

	var isntLoggerIn = function (req, res, next){
		if(!req.session.user){
			res.redirect('/');
			return;
		}
		next();
	};

	//Antes de que entre  la funcion checa si esta logeado
	server.get('/app', isntLoggerIn, function (req, res){
		res.render('app', {
			user: req.session.user,
			users: users
		});
	});
};

module.exports = appController;