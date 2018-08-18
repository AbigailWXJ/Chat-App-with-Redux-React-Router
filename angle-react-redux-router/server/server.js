const express = require('express');//引入express模块
const utils= require('utility');
const bodyParser = require('body-parser');//用于解析post过来的json
const cookieParser = require('cookie-parser');//用于解析cookie
const model = require('./model');
const Chat = model.getModel('chat');


const app = express();//app是一个express实例
//work with express
const server=require('http').Server(app);

const io=require('socket.io')(server);
//io是全局的链接，传入的参数socket是当前的连接，io.on监听事件
// data是传过来的数据，socket是当前的请求，io是全局的请求
// 使用io将接收到的数据发送到全局
io.on('connection',function(socket){
    console.log('user login')//说明用户已经
    socket.on('sendmsg',function(data){
        // console.log(data);
        io.emit('recvmsg',data)//发送全局事件
        const from=data.from
        const to=data.to
        const msg=data.msg
        const chatid=[from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        // console.log(data)
    })
})

const userRouter = require('./user');

app.use(cookieParser())    //  先解析cookie
app.use(bodyParser.json())   //解析post传过来的json
//开启一个中间件,若中间件是路由的话，在前面就用路由的形式,userRouter是一个子路由的形式
app.use('/user',userRouter);
// app.listen(9093,function(){
//     console.log('Node app start at port 9093');
// })
server.listen(9093,function(){
    console.log('Node app start at port 9093');
})