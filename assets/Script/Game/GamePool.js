// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var gamePool={
    prefabs:{},
    pool:{},
    factory:{
        Biu(node){
            
        },
    },
    instantiate:{},
    getNode:{},
    tempNode:{},

    onLoad () {},

    onInitial(){
        this.prefabs={};
        this.pool={};
        this.factory={};
        for(let i in window.game.system.prefabs){
            this.prefabs[window.game.system.prefabs[i].name]=window.game.system.prefabs[i];
        }
    },
    
    initialPool(type){
        this.pool[type]=new cc.NodePool();
    },
    instantiateNode(type){
        if(this.instantiate[type]){
            this.instantiate[type]();
        }else{
            this.tempNode=cc.instantiate(this.prefabs[type]);
            // if(this.tempNode.onInitial())
            this.pool[type].put(this.tempNode);
        }
        try{
            return this.getNode[type](type);
        }catch(e){
            return this.pool[type].get();
        }
    },
    get(type){
        if(!this.pool[type])this.initialPool(type);
        let node=this.instantiateNode(type);
        if(this.factory[type])return this.factory[type](node);
        else return node;
    },
    put(node){
        node.script.onReclaim();
        // console.log(this.pool[node.name])
        // if(this.pool[])
        this.pool[node.name].put(node);
    }
}

module.exports=gamePool;