var express = require('express.io'),
	swig = require('swig'),
	_ = require('underscore');

var RedisStore = require('connect-redis')(express);

var server = express();
server.http().io();

var users = [];

// Configuracion para renderear vistas
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', './app/views');

//Carga archivos estaticos
server.use(express.static('./public'));

// Agregamos post, cookie y sessiones
server.configure(function() {
	server.use(express.logger());
	server.use(express.cookieParser());
	server.use(express.bodyParser());

	server.use(express.session({
		secret : "lolcatz",
		store  : new RedisStore({})
		// store  : new RedisStore({
		//	host : conf.redis.host,
		//	port : conf.redis.port,
		//	user : conf.redis.user,
		//	pass : conf.redis.pass
		// });	
	}));
});

//Nos traemos los controladores
var homeController = require('./app/controllers/home.js');
var appController = require('./app/controllers/app.js');

homeController(server, users);
appController(server, users);

server.io.route('listo', function (req){
	//Solo a un usuario
	req.io.emit('datos',{
		mensage: 'listo'
	});
});

server.listen(3000);