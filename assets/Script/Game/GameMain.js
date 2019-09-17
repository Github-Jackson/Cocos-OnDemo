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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        require("GameSetting")
        window.game.wall=cc.find("Canvas/Wall");
        window.game.world=cc.find("Canvas/World");
        cc.director.getPhysicsManager().enabled = true
        cc.director.getPhysicsManager( ).debugDrawFlags=4095
        // window.game.world=cc.find("Canvas/Camera/World");
        window.game.control=require("GameControl")
        window.game.control.onLoad();
    },

    start () {
        let map=cc.find("Canvas/tileMap/gangti");
        let tiledObject=map.getComponent(cc.TiledObjectGroup).getObjects();
        window.test={tiled:tiledObject,map:map};
        for(let info in tiledObject){
            let phy=window.game.wall.addComponent(cc.PhysicsPolygonCollider)
            phy.points=[cc.v2()];
            for(let i in tiledObject[info].points){
                
                let t=tiledObject[info].points[i]; 
                phy.points.push(cc.v2(t.x,t.y));
                // phy.points=t.polylinePoints;
            }
            phy.offset=cc.v2(tiledObject[info].offset.x,-tiledObject[info].offset.y)
            phy.apply();
            window.test.phy=phy;
        }
    },

    // update (dt) {},
});
