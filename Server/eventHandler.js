

function applyForce(params, player){
    player.x+=params.x;
    player.y+=params.y;


}

function emitAttack(){
    console.log("attack is being emmitted");

}

function testEvent(){
    console.log("test event sucescfully called");
}


events = {
    "testEvent" : testEvent,
    "force": applyForce,
    "attack":   emitAttack
}

