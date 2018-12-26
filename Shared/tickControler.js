/*
i am moving the gameloop out of the main.js cuz it realy should be shared and both needs to be able to make
the buffer cycle
 */


function gameTick(){
    setTick(function () {
        guy.tick();

    })


}


function setTick(callback){
    //window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime) / 1000;


    callback();

    lastTime = currentTime;
}