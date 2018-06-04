'use strict'
const express = require('express');
const utils= require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
//定义统一的查询条件，即不希望密码之类的暴露出来，在内部使用
const _filter = {'pwd':0,'_v':0};
// 清楚聊天内容
// Chat.remove({},function(e,d){

// })

Router.get('/list',function(req,res){
    const type = req.query.type
    // User.remove({},function(e,d){

    // })//清楚list中所有的数据
    User.find({type},function(err,doc){
        return res.json({code:0,data:doc})
    })

})
Router.get('/getmsglist',function(req,res){
    //只需要当前用户的信息。故利用cookis将所有的用户信息获取出来
    //{'$or':[{from:user,to:user}]}
    const user=req.cookies.userid
    User.find({},function(e,userdoc){
        let users={}
        userdoc.forEach(v=>{
            users[v._id]={name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
        if(!err){
            return res.json({code:0,msgs:doc,users:users})
        }
    })
    })
})
Router.post('/readmsg',function(req,res){
    const userid=req.cookies.userid
    const from=req.body.from
    console.log(userid,from);
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
        console.log(doc);
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})
Router.post('/update',function(req,res){
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type,
        },body)
        return res.json({code:0,data})
    })
})

Router.post('/login',function(req,res){
    const user=req.body.user;
    const pwd=req.body.pwd;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        //保存cookie，即保存状态，写入id
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register',function(req,res){
    console.log(req.body);
    const user=req.body.user;
    const pwd=req.body.pwd;
    const type=req.body.type;
    User.findOne({user:user},_filter,function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel= new User ({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if(e){
                return res.json({code: 1,msg: '后端出错了'})
            }
            const user=d.user
            const type=d.type
            const _id=d._id
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
    })
}
)
//读取cookie  id
Router.get('/info',function(req,res){
    const userid=req.cookies.userid;
    if(!userid){
    // 用户有没有cookie
        return res.json({code:1})
    }
    User.findOne({_id:userid},function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })

})
//该函数实现的功能是对加密进行加盐，使其变得更加难
function md5Pwd(pwd){
    const salt='xuejiao_is_great_678wxgywughd!@#RFDGFXJY~~'
    return utils.md5(utils.md5(pwd+salt))
}
module.exports = Router