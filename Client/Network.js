//will contain match information. was in globals, moved here cuz used here first and there was an error
//should figure out how to move it back to globals as this is not good programing practice
/*
will control all net activity
 */
class Network {


    constructor() {
        this.gameroom = null;
        this.socket = io();
        this.match = null;
    }

    getmatch(){
        console.log("match maker working");
        this.socket.emit("matchMaker","thing");
        this.socket.on("matchMaker",function(msg){
            console.log("match gotten");
            net.gameroom = msg
            net.socket.on(net.gameroom,function(m){

                net.match = m;
                //console.log(net.match.players[0].x);
            })
        })
        }
 
    send(msg) {
        this.socket.emit(this.gameroom, msg);
        //this.socket.send(this.gameroom, msg);
        //this.socket.json.send(this.gameroom, msg);
    }

    receive(callback) {
        this.socket.on(this.gameroom, function (msg) {
            console.log("receive test "+msg);
            callback(msg);
        });

    }

}

