/*
will control all net activity
 */

class Network {

    constructor() {
        this.gameroom = null;
        this.socket = io();
    }

    getmatch(){
        this.socket.emit("matchMaker","thing");
        this.socket.on("matchMaker",function(msg){
            this.gameroom = msg;
            console.log(this.gameroom);
        });
    }
 
    send(msg) {
        this.socket.emit(this.gameroom, msg);
        //this.socket.send(this.gameroom, msg);
        //this.socket.json.send(this.gameroom, msg);
    }

    receive(callback) {
        this.socket.on(this.gameroom, function (msg) {
            //console.log("test "+msg);
            callback(msg);
        });

    }

}

