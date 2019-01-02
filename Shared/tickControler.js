/*
i am moving the gameloop out of the main.js cuz it realy should be shared and both needs to be able to make
the buffer cycle
 */

function isNode(){
    return !isClient();
}


function isClient(){
    return typeof module == 'undefined';
}

function gameTick(){
    var lenghtOfTick = 1000/tickSpeed;
    setInterval(function () {
        guy.tick();




    },lenghtOfTick);

}
