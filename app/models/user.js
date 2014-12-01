var models = require('./models'),
	Schema = models.Schema;


//Datos que tendremos de cada usurio
var userSchema = new Schema({
	//El username del user
	username: 'string',
	//Declaramos el JSON que nos regresa twitter y lo dejamos en el obj twitter
	twitter: Schema.Types.Mixed
});

//Definimos el modelo, de nombre user y que esquema siguen lo que estan dentro
var Users = models.model('user', userSchema);

module.exports = Users;