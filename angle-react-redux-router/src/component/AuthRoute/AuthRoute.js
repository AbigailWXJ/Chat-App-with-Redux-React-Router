import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {loadData} from '../../reduxs/user.redux';
import {connect} from 'react-redux';
//connect 一定要写道withRoutern 下面
@withRouter
@connect(
    null,
    {loadData})
//AuthRoute不是路由组件，因此没有操作路由属性的方法，因此，需要import{withRouter}
 class AuthRoute extends React.Component{
    componentDidMount(){
        const publist = ['/login','/register']
        const pathname = this.props.location.pathname //通过pathname获取当前的url
        //如果当前的url已经是登录或者注册页面的话，就不用跳转，直接返回一个空
        if(publist.indexOf(pathname)>-1) {
            return null
        }
         // get the information about user
        axios.get('/user/info').then(res=>{
            if(res.status===200) {
                if(res.data.code===0) {
                    //有登录信息的
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/login')
                }
                console.log(res.data);
            }
        })
        // 是否登录
        // 现在的url地址 login是不需要跳转的（即如果本来实在登录页面就不需要跳转到登录页面）
        // 用户的type 身份是boss 还是牛人
        // 用户是否完善信息（选择头像 个人简介）
    }
    render(){
        return null
    }

 }
 export default AuthRoute