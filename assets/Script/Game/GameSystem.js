// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       prefabs:[cc.Prefab],
    },



    onLoad () {
        window.game.system=this;
        this.cd=require("GameCD");
        this.pool=require("GamePool")

        this.onInitial();
    },

    onInitial(){
        this.cd.onLoad();
        this.cd.onInitial();
        this.pool.onLoad();
        this.pool.onInitial();
    },

    start () {

    },

    update (dt) {
        this.cd.update(dt);
    },
});
