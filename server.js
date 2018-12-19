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
