import React from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';
@connect(
    state=>state
)

class Msg extends React.Component{
    getLast(arr){
        return arr[arr.length-1]//用于获取最后一条信息
    }
    render(){
        const Item=List.Item;
        const Brief=Item.Brief;
        const userid=this.props.user._id;//当前的用户户id
        const userInfo=this.props.chat.users
        // console.log(this.props);

        // 按照聊天分组，根据chatid
        const msgGroup={}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid]=msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })

        //Object.values的作用是将参数拼成一个数组，并且去掉key值
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last=this.getLast(a).create_time
            const b_last=this.getLast(b).create_time
            return b_last-a_last
        })
        return (
            <div>
                    {chatList.map(v=>{
                        // console.log(v);
                        const LastItem=this.getLast(v);//获取最后一条聊天信息
                        const targetId=v[0].from===userid?v[0].to:v[0].from;
                        const unreadNum=v.filter(v=>!v.read&&v.to===userid).length
                        if(!userInfo[targetId]){
                            //如果没有聊天对象，直接就不显示
                            return null
                        }
                        return(
                            <List key={LastItem._id}>
                                <Item
                                    extra={<Badge text={unreadNum}></Badge>}
                                    thumb={require(`../img/${userInfo[targetId].avatar}.png`)}
                                    arrow='horizontal'
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${targetId}`)
                                    }}
                                >
                                    {LastItem.content}
                                    <Brief>{userInfo[targetId].name}</Brief>
                                </Item>
                            </List>
                        )
                    })}
            </div>
        )
    }
}
export default Msg