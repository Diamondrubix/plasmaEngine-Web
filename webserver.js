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


function matchMake(){
   io.on('connection', function(socket){
      
      socket.on("join", function(game){
         for(var match in matchQueue){
            if(match.name === game){
               addToQueue(match,socket);
               return;
            }
         }
         socket.emit("error","this is not a valid match type!");
      });

   });

   function addToQueue(match,socket){
      match.players.append(socket);
      if(match.players.size === match.quota){
         startMatch(match);
      }
   }


   function startMatch(match){
   	activeGames.append(Object.create(match));
   	match.players = [];

   	//eventually use a better method of determining port, so as to not run out of available ports
   	child = cp.fork('gameserver.js');
   	child.send("start",portCount);
   	portCount++;

   	child.on('started', function() {
   		for(var playerSocket in match.players){
   			playerSocket.emit("joinGame", portCount-1);
   		}
   	});
   }

}

serveWebsite();


