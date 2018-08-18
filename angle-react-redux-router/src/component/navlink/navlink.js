import React from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
//由于该组件不是路由组件，需要withRoute来提供相关的路由信息
@withRouter
@connect(
    state=>state.chat
)
class NavLinkBar extends React.Component{
    static propTypes= {
        data: PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide)
        const {pathname} = this.props.location
        return (
                <TabBar>
                    {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path=='/msg'? this.props.unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}//uri表示图片的地址
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                        >

                    </TabBar.Item>
                    ))}
                </TabBar>
            )
    }
}
export default NavLinkBar