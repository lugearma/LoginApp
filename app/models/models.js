var mongoose = require('mongoose');
//Conectamos mongoose con la BD
mongoose.connect('mongodb://localhost/' + 'backendPro');

module.exports = mongoose;