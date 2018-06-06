import React from 'react';
import {Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user';
import Msg from '../../component/msg/msg';
import {getMsgList,sendMsg,recvMsg} from '../../reduxs/chat.redux';

@connect(
    state=>state,
    {getMsgList,recvMsg})
class Dashboard extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render(){
        const {pathname} = this.props.location//Dashboad是路由组件，不需要使用withRouter
        const user = this.props.user
        const navList=[
            {
                path:'/boss',
                text:'牛人',//以boss身份进来的人，看到的是牛人列表
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type==='genius'
            },
             {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type==='boss'
            },
             {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User,
            }
        ]
        return (
            <div>
                <NavBar 
                className='fixed-header'
                mode='dark'
                >{navList.find(v=>v.path===pathname).title}
                </NavBar>
                <div>
                <Switch>
                {
                    navList.map(v=>(
                        <Route key={v.path} path={v.path} component={v.component}></Route>
                    ))
                }
                </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>

            </div>)
    }
}
export default Dashboard