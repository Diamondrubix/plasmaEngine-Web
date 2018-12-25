express = require('express');
app = express();
path = require('path');


Drawable = require('./Drawables/Drawable.js');
Player = require('./Drawables/Player.js');
game = require('./Server/game.js');
eventhander = require('./Server/eventHandler');

var http = require('http').Server(app);
//var io = require('socket.io')(http);
io = require('socket.io').listen(http);

app.use(express.static(__dirname + '/'));



app.get('/', function(req, res){
    res.sendFile(__dirname + '/Client/game.html');
});


matches = [];
match = {
    "gameroom": "gameroom1",
    "players": []
}
matches.push(match);


//helper function to find the right player
function getPlayer(matchid, id){
    for(let i =0;i<matches[matchid].players.length;i++) {
        if (matches[matchid].players[i].id === id) {
            return matches[matchid].players[i];
        }
    }
}

io.on('connection', function(socket){

    console.log('a user connected');
    console.log(socket.id);


    /*
    match maker needs some work, but the basic responsibilty of match maker is to take all players and put them into a match
    match being a json containing the gameroom they belond in, and an array of other players.
    the client should get the room they belong in as a response.

    currently I took a shortcut and hard coded this to make this easier on myself and I declared match as a global vaiable
    above in an effort to avoid dealing with the fact that match keeps getting overwriten when a another person connects.
    this should be delt with later, for now i manually set up the desired environment.
     */
    socket.on("matchMaker", function(msg){
        console.log("matchmaker working")
        let player = new Player(10,10, socket.id);

        matches[0].players.push(player);



        //io.emit("matchMaker", "gameroom1");
        io.emit("matchMaker", matches[0]);

    });


    /*
    we need to figure out how to make gamerooms dynamically. otherwise, this will be handling inputs and outputs to each client.
     */
    socket.on('gameroom1', function(msg) {
        let p = getPlayer(0, socket.id);

        if (msg.events != undefined) {
            for (let i = 0; i < msg.events.length; i++) {
                events[msg.events[i].event](msg.events[i].params, p);
            }
        }

        //once all the events have been processed we send out the new match data structure to all clients so they
        //can update what they need to on their ends
        io.emit("gameroom1", matches[0]);

    });


    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});




var port = 3001;
http.listen(port, function () {
    console.log('listening on port '+port);
});

