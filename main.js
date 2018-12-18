function setup(){
    vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (typeof (canvas.getContext) !== undefined) {
        cx = canvas.getContext('2d');
        gameLoop();
    }

    window.addEventListener('keydown',keydown,false);
    window.addEventListener('keyup',keyup,false);
    canvas.addEventListener("mousedown", onClick, false);
    canvas.addEventListener("mouseup", onClickUp, false);
    canvas.addEventListener("mousemove", onmove, false);
    canvas.addEventListener("mousewheel", wheelMove, false);

    guy = new Player(10,10);
    guy.keys = true;
    gameObjects.push(guy);

}

function draw(){

    cx.beginPath();
    cx.fillStyle = "green";
    cx.fillRect(0,0,canvas.width,canvas.height);
    cx.fill();

    for(var i=0; i < gameObjects.length; i++){
        gameObjects[i].tick();
        gameObjects[i].paint();
    }
}

function gameLoop() {
    window.requestAnimationFrame(gameLoop);


    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime) / 1000;
    cx.clearRect(0, 0, cw, cw);

    draw();

    lastTime = currentTime;
}

setup()