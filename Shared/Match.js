function isNode(){
    return !isClient();
}


function isClient(){
    return typeof module == 'undefined';
}


class Match{

    constructor(gm){
        this.gameroom = gm;
        this.players = []; //for all players
        this.drawables = []; //for all drawables that need to be updated location wise
        this.staticDraw = []; //for non moving/non updating drawables (might not be nessesary but leaving it just in case)
    }
}

if (typeof module !== 'undefined') {
    module.exports = Match;
}

if(isNode()){
    module.exports = Match;
}
