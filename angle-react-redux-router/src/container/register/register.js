import React from 'react';
import Logo from '../../component/logo/logo';
import {List, InputItem,Radio, WhiteSpace,Button} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../reduxs/user.redux';
import {Redirect} from 'react-router-dom';
import angleForm from '../../component/angle-form/angle-form';

@connect(
    state=>state.user,
    {register}
)
@angleForm
class Register extends React.Component{
    constructor(props){
        super(props)
        this.handleRegister=this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange('type','genius') //添加了一个默认值
    }
    handleRegister(){
        this.props.register(this.props.state)
    }
    render(){
        const RadioItem=Radio.RadioItem;
        return (
            <div>
            {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
            <Logo></Logo>
                <List>
                {this.props.msg? <p className="error-msg">{this.props.msg}</p>: null}
                    <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                    <WhiteSpace></WhiteSpace>
                    <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>设置密码</InputItem>
                    <WhiteSpace ></WhiteSpace>
                    <InputItem type='password' onChange={v=>this.props.handleChange('repeatpwd',v)}> 确认密码 </InputItem>
                    <WhiteSpace></WhiteSpace>
                    <RadioItem 
                    checked={this.props.state.type==='genius'}
                    onChange={()=>this.props.handleChange('type','genius')}>牛人</RadioItem>
                    <WhiteSpace></WhiteSpace>
                    <RadioItem
                    checked={this.props.state.type==='boss'}
                    onChange={()=>this.props.handleChange('type','boss')}>BOSS</RadioItem>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                </List>
            </div>)
    }
}
export default Register