
/*
process.on('message', function(message,io) {
	console.log(message);
});*/

//ifconfig lo0 alias 127.0.0.2
//sudo ifconfig en0 alias 127.0.0.3

express = require('express');
app = express();
path = require('path');
var http = require('http').Server(app);
io = require('socket.io').listen(http);




io.on('connection', function(socket){

    console.log('a little user connected');
    socket.on("hi", function(msg){
    	console.log("Few");
    });
});


var port = 3001;
http.listen(port,"127.0.0.2", function () {
    console.log('little listening on port '+port);
});
