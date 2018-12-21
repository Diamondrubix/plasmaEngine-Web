express = require('express');
app = express();
path = require('path');

var http = require('http').Server(app);
//var io = require('socket.io')(http);
io = require('socket.io').listen(http);

app.use(express.static(__dirname + '/'));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/Client/game.html');
});


io.on('connection', function(socket){

    console.log('a user connected');


    socket.on('gameroom1', function(msg){





        io.emit("gameroom1", msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});




var port = 3001;
/*
http.on('error', function(e){
    port = 80;
    http.listen(port, function () {
        console.log('listening on port '+port);
    });

})
*/

http.listen(port, function () {
    console.log('listening on port '+port);
});
