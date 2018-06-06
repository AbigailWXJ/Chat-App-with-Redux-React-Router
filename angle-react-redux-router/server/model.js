'use strict'
const mongoose = require('mongoose'); //引入mongoose模块

// 链接mongo（在这里是本地链接）
// const DB_URL = 'mongodb://localhost:27017';
// 链接并使用imooc这个集合 如果没有有imooc-chat这个集合，会自动新建一个
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL);//连接
const models={
    user:{
        'user': {'type':String,'require': true},
        'pwd': {'type': String,'require': true},
        'type': {'type':String,'require':true},
        //头像
        'avatar': {'type':String},
        // 个人简介或者职位简介
        'desc': {'type':String},
        //职位名
        'title': {'type':String},
        // 如果你是boss，还要加两个字段
        'company': {'type':String},
        'money': {'type':String}
    },
    chat: {
        'chatid':{'type':String,'require':true},
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        'read':{'type':Boolean,'default':false},
        'content':{'type':String,'require':true,'default':''},
        'create_time':{'type':Number,'default':new Date().getTime()}
    }
}
for (let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports={
    getModel: function(name){
        return mongoose.model(name)
    }
}