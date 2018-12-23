

class Player extends Drawable{


    constructor(x,y, id) {

        super(x,y,30,30,"red")

        this.classType = "Player";
        this.speed = 2;
        this.id = id;
        this.oldX = x;
        this.oldY = y;
        this.moveable = false;
        this.events = [];

    }

    eventExists(e){

        for(var i =0; i<this.events.length;i++){
            if(this.events[i].event===e){
                return i;
            }
        }
        return -1;
    }


    handleKeys(){

        //force on player
        {
            let xforce = 0;
            let yforce = 0;
            if (keys.indexOf("d") !== -1) {
                xforce +=this.speed;
            }

            if (keys.indexOf("a") !== -1) {
                xforce -=this.speed;
            }


            if (keys.indexOf("w") != -1) {
                net.send({"event": "attack"});
                yforce-=this.speed;
                //this.y--;
            }

            if (keys.indexOf("s") != -1) {
                //this.y++;
                yforce+=this.speed;
            }
            if(yforce!=0||xforce!=0){
                this.events.push(
                    {
                        "event": "force",
                        "params": {
                            "x": xforce,
                            "y": yforce
                        }
                    }
                )
            }
        }


        //kept this to test handling multiple events at the same time
        if(keys.indexOf("ArrowRight")!=-1){
            this.events.push(
                {
                    "event": "testEvent"
                }
            )
        }


    }


    tick(){
        //first part gets and creates the event array sending it to the server
        this.events = [];
        this.handleKeys();
        net.send({
            "events" : this.events
        });

        //once this is called it should have recived updates from the server and this will execute those changes
        super.tick();

        //this part takes the match data recived from the server and updates the objects. maybe it should be moved
        //somewhere else, but idk we should talk about it.
        if(net.match!=null) {
            this.x = net.match.players[0].x;
            this.y = net.match.players[0].y;
        }



    }

}

if (typeof module !== 'undefined') {
    module.exports = Player;
}


