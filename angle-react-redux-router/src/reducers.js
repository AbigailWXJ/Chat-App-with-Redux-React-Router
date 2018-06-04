//合并reducer 并且返回
import {combineReducers} from 'redux';
import {user} from './reduxs/user.redux';
import {chatuser} from './reduxs/chatUser.redux';
import {chat} from './reduxs/chat.redux'
export default combineReducers({user,chatuser,chat})