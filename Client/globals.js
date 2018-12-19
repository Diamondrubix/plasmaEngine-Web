
canvas = document.getElementById('canvas');
cw = canvas.width;
ch = canvas.height;

centerX = cw/2;
centerY = ch/2;

cx = null;
fps = 60;
lastTime = (new Date()).getTime();
currentTime = 0;
keys = [];
gameObjects = [];

camera = {
    zoom : 1,
    x : centerX,
    y : centerY,
    xOff : 0,
    yOff : 0
};
net = null;
//net = new Network("gameroom1");

mouseDown = false;
oldMouseX = 0;
oldMouseY = 0;
