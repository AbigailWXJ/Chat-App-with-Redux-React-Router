import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import {connect} from 'react-redux';
import {update} from '../../reduxs/user.redux';
import {Redirect} from 'react-router-dom'

@connect(
    state=>state.user,
    {update})
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title: '',
            desc:'',
            company: '',
            money: ''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path= this.props.location.pathname //获得当前的路由路径，用于下面进行判断，如果路径不变不进行跳转，不一样才进行跳转
        const redirect = this.props.redirectTo
        return (
            <div>
            {redirect&&redirect!==path ? <Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">Boss 完善信息页面</NavBar>
                <AvatarSelector selectAvatar={(imgname)=>this.setState({avatar:imgname})}></AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('title',v)}>招聘职位</InputItem>
                <InputItem onChange={(v)=>this.onChange('company',v)}>公司名称</InputItem>
                <InputItem onChange={(v)=>this.onChange('money',v)}>职位薪资</InputItem>
                <TextareaItem rows={3} autoHeight title='职位要求' onChange={(v)=>this.onChange('desc',v)}>职位要求</TextareaItem>
                <Button 
                onClick={()=>{
                    this.props.update(this.state)
                }}
                type='primary'>保存</Button>
            </div>)
    }
}
export default BossInfo