
function isNode(){
    return !isClient();
}


function isClient(){
    return typeof module == 'undefined';
}


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

        if(keys.indexOf("r")!=-1){
            this.events.push(
                {
                    "event":"attack"
                }
            )
        }

    }


    tick(){
        if(isClient()) {
            //first part gets and creates the event array sending it to the server
            this.events = [];
            this.handleKeys();

            //everything below should probably be moved to a global event handler
            net.send({
                "events": this.events
            });

            //adds the events to the cyclic buffer
            cyclicBuffer.addState(events);


            //second part does the event handling locally

            for (let i = 0; i < events.length; i++) {
                events[events[i].event](events[i].params, p);
            }




            //once this is called it should have recived updates from the server and this will execute those changes
            super.tick();
        }

    }

}

if (typeof module !== 'undefined') {
    module.exports = Player;
}


if(isNode()){
    module.exports = Player;
}
