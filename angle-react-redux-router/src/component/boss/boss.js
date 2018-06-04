import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../reduxs/chatUser.redux';
import UserCard from '../usercar/usercard'


@connect(
    state=>state.chatuser,
    {getUserList})
class Boss extends React.Component{
    componentDidMount(){
        this.props.getUserList('genius')
    }
    //Card.header中的参数，title表示卡片标题，thumb表示卡片标题图片，extra表示卡片标题辅助内容 
    //如果用户没有头像，认为是没有完善信息，不显示该用户
    render(){
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}
export default Boss