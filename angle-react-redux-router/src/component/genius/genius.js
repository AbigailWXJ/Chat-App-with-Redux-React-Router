import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../reduxs/chatUser.redux'
import UserCard from '../usercard/usercard'
@connect(
    state=>state.chatuser,
    {getUserList})
class Genius extends React.Component{
    componentDidMount(){
        this.props.getUserList('boss')
    }
    render(){
        return <UserCard userlist={this.props.userlist}></UserCard>

    }

}
export default Genius