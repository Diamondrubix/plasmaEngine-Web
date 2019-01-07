cp = require('child_process');
express = require('express');
app = express();
path = require('path');
http = require('http').Server(app);
io = require('socket.io').listen(http);


port = 3001;
portCount = port+1;


matchQueue = [

   {
      "name":"solo",
      "quota": 1,
      "players": []
   },

   {
      "name":"1v1",
      "quota": 2,
      "players": []
   },

   {
      "name":"2v2",
      "quota": 4,
      "players": []
   }

]


activeGames = [];
keyMap = {};

function serveWebsite(){
   
   app.use(express.static(__dirname + '/'));
   app.get('/', function(req, res){
      res.sendFile(__dirname + '/Client/matchsetup.html');
   });


   http.listen(port, "127.0.0.1", function () {
       console.log('listening on port '+port);
       matchMake();
   });
}


function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function matchMake(){
   io.on('connection', function(socket){
      
      socket.on("join", function(game){

         for(var i in matchQueue){
         	var match = matchQueue[i];


            if(match.name === game){
               addToQueue(match,socket);
               return;
            }
         }
         socket.emit("error","this is not a valid match type!");
      });

   });

   function addToQueue(match,socket){

      match.players.push(socket);

      if(match.players.length === match.quota){
         startMatch(match);
      }
   }


   function startMatch(match){

      activeMatch = Object.create(match);
      activeMatch.port = portCount;
      activeMatch.keys = [];
      for(let i = 0; i < activeMatch.quota; i++){
         let id = makeId();
         activeMatch.keys.push(id);
         keyMap[id] = activeMatch.port;
      }
   	activeGames.push(activeMatch);
   

   	//eventually use a better method of determining port, so as to not run out of available ports
   	child = cp.fork('gameserver.js');
      matchData = JSON.stringify({port: portCount, quota: match.quota, keys: activeMatch.keys});
   	child.send(matchData);
   	portCount++;


   	child.on('message', function(msg) {
   		if(msg=="started"){

   			for(var i in match.players){
   				match.players[i].emit("game_started", portCount-1);
   			}
   			match.players = [];
   		}
   	});
   }

}

serveWebsite();


