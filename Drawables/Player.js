class Player extends Drawable{


    constructor(x,y, id) {

        super(x,y,30,30,"red")

        this.classType = "Player";
        this.speed = 2;
        this.id = id;

        this.oldX = x;
        this.oldY = y;
        this.moveable = false;

    }




    handleKeys(){


        if(keys.indexOf("d")!=-1){

            //this.x++;

        }

        if(keys.indexOf("a")!=-1){

            //this.x--;
        }


        if(keys.indexOf("w")!=-1){

            //this.y--;
        }

        if(keys.indexOf("s")!=-1){
            //this.y++;
        }



        if(keys.indexOf("ArrowRight")!=-1){
            camera.xOff -= this.speed;
        }

        if(keys.indexOf("ArrowLeft")!=-1){
            camera.xOff += this.speed;
        }


        if(keys.indexOf("ArrowDown")!=-1){
            camera.yOff -= this.speed;
        }

        if(keys.indexOf("ArrowUp")!=-1){
            camera.yOff += this.speed;
        }


        if(keys.indexOf("z")!=-1){
            camera.zoom += 0.05;

            camera.x = centerX/camera.zoom;
            camera.y = centerY/camera.zoom;

        }


        if(keys.indexOf("x")!=-1){
            camera.zoom -= 0.05;

            camera.x = centerX/camera.zoom;
            camera.y = centerY/camera.zoom;

        }

    }

    tick(){
        this.handleKeys();
        super.tick();

    }



}