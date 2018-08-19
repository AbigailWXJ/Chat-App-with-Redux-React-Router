import express from 'express';//引入express模块
import utils from 'utility';
import bodyParser from 'body-parser';//用于解析post过来的json
import cookieParser from 'cookie-parser';//用于解析cookie
import model from './model';
import path from 'path';
//https://github.com/css-modules/css-modules-require-hook
import csshook from 'css-modules-require-hook/preset' // import hook before routes
import assethook from 'asset-require-hook';
assethook({
    extensions:['png']
})

import React from 'react';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {StaticRouter} from 'react-router-dom';
import App from '../src/App';
import reducers from '../src/reducers';


import {renderToString,renderToNodeStream} from 'react-dom/server';
import staticPath from '../build/asset-manifest.json';//获取静态资源文件，因为文件在变化，需要动态的引入
// console.log(staticPath)

const Chat = model.getModel('chat');
const app = express();//app是一个express实例
const server=require('http').Server(app);//work with express
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

//设置静态资源地址
app.use(function(req,res,next){
    if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
        return next()
    }
    const store=createStore(reducers,compose(
    applyMiddleware(thunk),
    ))
    // let context = {}
    // const markup=renderToString(
    //     (<Provider store={store}>
    //         <StaticRouter
    //             location={req.url}
    //             context={context}>
    //             <App></App>
    //         </StaticRouter>
    //     </Provider>)
    //     )
    //     
    const obj={
        '/msg':'React聊天消息页面',
        '/boss':'Boss查看牛人列表页'
    }
    let context = {}
    res.write(`<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="theme-color" content="#000000">
            <meta name="keywords" content="React,Redux,Chat,SSR">
            <meta name="description" content='${obj[req.url]}'>
            <title>React App</title>
            <link rel="stylesheet" href="/${staticPath['main.css']}" />
          </head>
          <body>
            <div id="root">`)
    const markupStream = renderToNodeStream(
        (<Provider store={store}>
            <StaticRouter
                location={req.url}
                context={context}>
                <App></App>
            </StaticRouter>
        </Provider>)
        )
    markupStream.pipe(res,{end:false})
    markupStream.on('end',()=>{
        res.write(`</div>
            <script src="/${staticPath['main.js']}"></script>
          </body>
        </html>`)
        res.end()
    })
    // const pageHtml = `
    //     <!doctype html>
    //     <html lang="en">
    //       <head>
    //         <meta charset="utf-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1">
    //         <meta name="theme-color" content="#000000">
    //         <meta name="keywords" content="React,Redux,Chat,SSR">
    //         <meta name="description" content='${obj[req.url]}'>
    //         <title>React App</title>
    //         <link rel="stylesheet" href="/${staticPath['main.css']}" />
    //       </head>
    //       <body>
    //         <div id="root">${markup}</div>
    //         <script src="/${staticPath['main.js']}"></script>
    //       </body>
    // //     </html>
    // `
    // return res.sendFile(path.resolve('build/index.html'))
    // res.send(pageHtml)
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,function(){
    console.log('Node app start at port 9093');
})