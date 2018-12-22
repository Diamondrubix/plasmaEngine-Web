/*
will control all net activity
 */

class Network {

    constructor(gameroom) {
        this.gameroom = gameroom;
        this.socket = io();
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