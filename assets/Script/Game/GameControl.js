// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var gameControl={
    key:{},
    event:{},
    onLoad(){
        cc.systemEvent.on("keydown",gameControl.keyDown);
        cc.systemEvent.on("keyup",gameControl.keyUp);
        
    }, 
    registerEvent(key,func){
        if(!gameControl.event[key]){
            gameControl.event[key]=[];
        }
        gameControl.event[key].push(func);
    },
    keyDown(e){
        gameControl.key[window.event.key.toLowerCase()]=true;
        for(let t in gameControl.event[window.event.key]){
            gameControl.event[window.event.key][t].execute();
        }
    },
    keyUp(e){
        gameControl.key[window.event.key.toLowerCase()]=false;
        for(let t in gameControl.event[window.event.key]){
            gameControl.event[window.event.key][t].execute();
        }
    }
}

module.exports=gameControl;