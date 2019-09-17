// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
 

var gameCD={
    skills:{},
    cdQueue:{},
    cd:{},

    onLoad(){},
    onInitial(){},

    trusteeshipSkill(skill){
        this.skills[skill.name]=skill;
        this.cdQueue[skill.name]=skill.cd;
        this.cd[skill.name]=false;
    },
    useSkill(skill){
        if(this.cd[skill.name]){
            skill.skill.call(skill.target);
            this.trusteeshipSkill(skill);
        }else{
            console.log("技能未就绪"+this.cdQueue[skill.name])
        }
    },

    update(dt){
        for(let i in this.cdQueue){
            this.cdQueue[i]-=dt;
            if(this.cdQueue[i]<=0){
                this.cd[i]=true;
            }
        }
    },
}
        
module.exports=gameCD;