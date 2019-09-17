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
        speed:800,
        // subjection:null,
    },

    onLoad () {
        this.node.script=this;
        this.rigidBody=this.getComponent(cc.RigidBody);
    },

    onInitial(){
        this.node.position=this.subjection.position;
    },

    onLaunch(vec){
        this.node.rotation=cc.misc.radiansToDegrees(vec.signAngle(cc.v2(0,1)));
        vec=vec.normalize().mul(this.speed);
        this.rigidBody.linearVelocity=vec;
    },
    onReclaim(){

    },
    onDie(){
        window.game.system.pool.put(this.node);
    },
    start () {
    },

    update (dt) {
    //   console.log(this.node.position)  
    },

    onBeginContact(c,self,other){
        self.node.script.onDie();
    }
});
