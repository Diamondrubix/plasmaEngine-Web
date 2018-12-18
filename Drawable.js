

class Drawable {

    constructor(x,y,width,height,color) {
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;

        this.color = color;

        this.xVel = 0;
        this.yVel = 0;

        this.moveable = true;

        this.id = Math.random();

        this.classType = "Drawable";
    }

    collide(r){
        var happend = (this.x < r.x + r.width && this.x + this.width > r.x && this.y < r.y + r.height && this.y + this.height > r.y);

        var a = this;
        var b = r;

        var x = Math.max(a.x, b.x);
        var num1 = Math.min(a.x + a.width, b.x + b.width);
        var y = Math.max(a.y, b.y);
        var num2 = Math.min(a.y + a.height, b.y + b.height);

        if(happend){
            return {
                overlapX : num1 - x,
                overlapY: num2 - y,
            }
        }else{
            return false;
        }

    }

    onCollision(callback){
        for(var i=0; i<gameObjects.length;i++){
            if(gameObjects[i]!=this){
                var collision = this.collide(gameObjects[i]);
                if(collision != false){
                    callback(gameObjects[i], collision);
                }
            }
        }
    }

    tick(){
        this.oldX = this.x;
        this.oldY = this.y;

    }

    paint(){
        cx.beginPath();
        cx.strokeStyle = this.color;
        cx.rect((this.x+camera.x+camera.xOff)*camera.zoom,(this.y+camera.y+camera.yOff)*camera.zoom,this.width*camera.zoom,this.height*camera.zoom);
        cx.stroke();
    }


}