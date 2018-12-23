function setup(){

    net.getmatch();


    vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (typeof (canvas.getContext) !== undefined) {
        cx = canvas.getContext('2d');
        gameLoop();
    }



    //keys setup
    window.addEventListener('keydown',keydown,false);
    window.addEventListener('keyup',keyup,false);
    canvas.addEventListener("mousedown", onClick, false);
    canvas.addEventListener("mouseup", onClickUp, false);
    canvas.addEventListener("mousemove", onmove, false);
    canvas.addEventListener("mousewheel", wheelMove, false);



    //entities setup
    guy = new Player(10,10);
    guy.keys = true;
    gameObjects.push(guy);
    /*
    net.receive(function(m){
        match = m;
    })
    */
}
function keydown(e) {
    index = keys.indexOf(e.key);

    if (index === -1) {
        keys.push(e.key);
    }
}

function keyup(e) {
    index = keys.indexOf(e.key);
    //console.log("keyup "+index+" key: "+e.key);
    if (index > -1) {
        keys.splice(index, 1);
    }

}

function onClick(e) {
    console.log("onclick");

}

function wheelMove(e){
    e.preventDefault();
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    scrollSpeed = 0.2
    console.log("wheelmove e:"+e+" delta:"+delta);
}


function onmove(e){

}



function onClickUp(e) {
    console.log("click up");
    mouseDown = false;
}

function draw(){
    cx.clearRect(0, 0, cw, cw);
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


    draw();

    lastTime = currentTime;
}


setup()