express = require('express');
app = express();
path = require('path');

Drawable = require('./Drawables/Drawable.js');
Player = require('./Drawables/Player.js');

var http = require('http').Server(app);
//var io = require('socket.io')(http);
io = require('socket.io').listen(http);

app.use(express.static(__dirname + '/'));


app.get('/', function(req, res){
    res.sendFile(__dirname + '/Client/game.html');
});


function applyForce(la,da){

}

function emitAttack(la,da){
    
}


events = {
   "force": applyForce,
   "attack":   emitAttack
}


matches = [];


io.on('connection', function(socket){

    console.log('a user connected');
    console.log(socket.id);



    socket.on("matchMaker", function(msg){
        console.log("matchmaker working")
        let player = new Player(10,10, socket.id);
        let match = {
            "gameroom" : "gameroom1",
            "players": []
        }
        match.players.push(player);

        matches.push(match);

        io.emit("matchMaker", "gameroom1");


    });


    socket.on('gameroom1', function(msg){

        match = {
            "gameroom": "gameroom1",
        }

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

