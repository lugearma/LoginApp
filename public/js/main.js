$(document).ready(function(){
	//Nos traemos la variable del global
	window.io = io.connect();

	//cuando este listo el socket
	io.on('connect', function (socket){
		console.log('Hola, ya esta el socket');
		io.emit('listo');
	});

	io.on('datos', function (data){
		console.log(data);
	});

	io.on('log-in', function (data) {
		$('#lista').append('<li>' + data.username + '</li>');
	});

	io.on('log-out', function (data) {
		$('#lista li').each(function (i, item){
			if(item.innerText == data.username){
				$(item).remove();
			}
		});
	});

	io.on('post', function (data){

		$('#post').append('<p>'+ data.user.username + ':' + data.content + '</p>');
	});
});