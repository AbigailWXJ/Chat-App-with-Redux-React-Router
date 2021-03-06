import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user';
import Msg from '../../component/msg/msg';
import {getMsgList,recvMsg} from '../../reduxs/chat.redux';
import QueueAnim from 'rc-queue-anim';


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
        const user = this.props.user //获取用户信息
        // 定义了四个页面的相关路由信息，以及相应的信息
        const navList=[
            {
                path:'/boss',
                text:'牛人',//以boss身份进来的人，看到的是牛人列表
                icon:'boss',//要渲染页面的图标
                title:'牛人列表',//Header上面的title
                component:Boss,//要渲染的组件的名称
                hide:user.type==='genius'//不同的身份看到不同的页面，对于不让其看到的身份进行隐藏
            },
             {
                path:'/genius',
                text:'boss',//要查看的boss
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
        const page = navList.find(v=>v.path==pathname)
        //console.log(page)
        //让动画生效，只渲染一个Route，根据当前的path决定组件
        return page?(
            <div>
                <NavBar className='fixed-header' mode='dark'>{page.title}</NavBar>
                <div style={{marginTop: 45}}>
                <QueueAnim type='scaleX' duration={800}>
                    <Route key={page.path} path={page.path} component={page.component}></Route>
                </QueueAnim>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>

            </div>
            ):<Redirect to='/msg'></Redirect>
    }
}
export default Dashboard
