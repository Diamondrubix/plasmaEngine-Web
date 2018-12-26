/*
class is used to make the cycle buffer. figured a class would make it easier to manage than if i were to
manually use an array of matches.
the idea is that the server and the client both track changes made each tick counting what tick these things happen
as long as the server and client agree that one the corresponding tick number what the data should be there are no problems.

if they disagree the client is to abaondon their data past that point then fast forward those action to see what would happen
this should always be possible as its irrelevant what events the client sends, the server should be able to handle it.
 */


class Buffer{

    constructor(){
        this.states = [];
    }

    addState(s){
        this.states.push(s);
    }

}


//state would be a inner class in java, but this is javascript so...
class state {

    constructor(time, match){
        this.time = time;
        this.match = match;
        
    }

}

