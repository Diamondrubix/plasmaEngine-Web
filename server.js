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


function applyForce(){

}

function emitAttack(){
    
}


events = {
   "force": applyForce,
   "attack":   emitAttack
}




io.on('connection', function(socket){


    console.log('a user connected');
    console.log(socket.id);

    socket.on('gameroom1', function(msg){
        
        events[msg.event](msg.id,msg); 

        io.emit("gameroom1", msg);
    });


    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});




var port = 3001;
http.listen(port, function () {
    console.log('listening on port '+port);
});

