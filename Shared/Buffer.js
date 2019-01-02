/*
class is used to make the cycle buffer. figured a class would make it easier to manage than if i were to
manually use an array of matches.
the idea is that the server and the client both track changes made each tick counting what tick these things happen
as long as the server and client agree that one the corresponding tick number what the data should be there are no problems.

if they disagree the client is to abaondon their data past that point then fast forward those action to see what would happen
this should always be possible as its irrelevant what events the client sends, the server should be able to handle it.
 */

//NOTE!!!!
//there is a lot going on with the code right now and i just needed this to work.
//doing a queue with arrays will run in O(n) time and thus should probably eventually be switched fora datastructure
//that can do it in O(1) time. as said before, coudn't be bothered to figure out how to do that in javascript at the moment
//but it should be easy to change later
class Buffer{

    constructor(initState){
        this.states = [];
        this.states.push(initState);
    }

    addState(s){
        this.states.push(s);
    }

    getPlayer(players){

    }

    checkState(s){
        this.states[1].players

    }

}