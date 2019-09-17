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
        speed:30,
        vec:cc.v2(),
        tVec:cc.v2(),
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.role=this;
        this.onInitial();
    },
    onInitial(){
        this.rigidBody=this.getComponent(cc.RigidBody);
        this.skills={
            dodge:{
                name:this.node.name+"dodge",
                cd:0.50,
                target:this,
                skill:this.dodge,
            },
            attack:{
                name:this.node.name+"attack",
                cd:0.1,
                target:this,
                skill:this.attack,
            }
        };
        this.control={
            w:cc.v2(0,1),
            s:cc.v2(0,-1),
            a:cc.v2(-1,0),
            d:cc.v2(1,0),
        }
        this.registerSkill();
    },

    onAttack(e){
        console.log(e)
        window.game.system.cd.useSkill(this.skills.attack);
        window.game.world.addChild(this.biu=window.game.system.pool.get("Biu"));
        this.biu.script.subjection=this.node;
        this.biu.script.onInitial();
        this.tVec=e.getLocation().add(game.camera.node.position);
        console.log(this.tVec)
        this.biu.script.onLaunch(this.tVec.sub(this.rigidBody.getWorldCenter()));

    },
    attack(){
    },


    registerSkill(){
        for(let i in this.skills){
            window.game.system.cd.trusteeshipSkill(this.skills[i]);
        }
    },
    useSkill(skill){
        window.game.system.cd.useSkill(skill);
    },

    move(vec){
        vec=vec.normalize().mul(this.speed);
        this.rigidBody.linearVelocity=vec;
    },
    dodge(){
        let vec=this.rigidBody.linearVelocity;
        vec=vec.normalize().mul(200);
        this.action=cc.moveBy(0.25,vec);
        this.node.runAction(this.action);
    },
    dodge2(){

    },
    dodgeEvent(){
        if(window.event.type=="keydown"){
            this.useSkill(this.skills.dodge);
        }else{

        }
    },
    rushEvent(){
        window.game.event=window.event;
        if(window.event.type=="keydown"){
            this.speed=180;
        }else if(window.event.type=="keyup"){
            this.speed=60;
        }
    },
    start () {

    },

    update (dt) {
        this.vec=cc.v2();
        for(let t in this.control){
            if(window.game.control.key[t]){
                this.vec=this.vec.add(this.control[t]);
            }
        }
        this.move(this.vec);
    },
    onBeginContact(c,self,other){
        if(other.node.group=="Broder"){
            this.action.stop();
        }
    },
});
