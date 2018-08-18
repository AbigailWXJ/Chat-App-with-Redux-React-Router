import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem,WingBlank, WhiteSpace,Button} from 'antd-mobile';
import { connect} from 'react-redux';
import { login } from '../../reduxs/user.redux';
import {Redirect} from 'react-router-dom';
import angleForm from '../../component/angle-form/angle-form'
@connect(
    state=>state.user,
    {login})
@angleForm  //自己写的一个高阶组件，传入一个组件，新增一个handleChange
class Login extends React.Component{
    constructor(props){
        super(props);
        this.register=this.register.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
    }
    //路由组件
    register(){
        // console.log(this.props);
        this.props.history.push('/register')//跳转到注册页面
    }
    handleLogin(){
        this.props.login(this.props.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login' ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                <WingBlank>
                <List>
                    {this.props.msg? <p className="error-msg">{this.props.msg}</p>: null}
                    <InputItem
                    onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem type='password'
                    onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                    <WhiteSpace></WhiteSpace>
                </List>
                    <Button onClick={this.handleLogin} type='primary'>登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>)
    }
}
export default Login