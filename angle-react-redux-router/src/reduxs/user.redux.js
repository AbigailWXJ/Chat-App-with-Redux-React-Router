
import axios from 'axios';
import {getRedirectPath} from '../util';
// const REGISTER_SUCCESS='REGISTER_SUCCESS';
// const LOGIN_SUCCESS='LOGIN_SUCCESS';
const AUTH_SUCCESS='AUTH_SUCCESS'
const ERROR_MSG='ERROR_MSG';
const LOAD_DATA='LOAD_DATA';
const LOGOUT='LOGOUT';
const initState={
    redirectTo:'',
    // isAuth:false,
    msg:'',
    user: '',
    type: ''
}
//reducer
export function user(state=initState,action){
    switch(action.type){
        // case REGISTER_SUCCESS:
        //     return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth: true,...action.payload}
        // case LOGIN_SUCCESS:
        //     return {...state,msg:'',redirectTo:getRedirectPath(action.payload),isAuth: true,...action.payload}
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload,pwd:''}
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,msg:action.msg}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state

    }
}
function authSuccess(obj){
    //过滤掉pwd字段
    const {pwd,...data}=obj
    return {type:AUTH_SUCCESS,payload:data}
}
// function registerSuccess(data){
//     return {type:REGISTER_SUCCESS,payload: data}
// }
// function loginSuccess(data){
//     return {type:LOGIN_SUCCESS,payload:data}
// }

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
//action creator
export function loadData(userinfo){
    // console.log(loadData);
    return {type:LOAD_DATA,payload:userinfo}
}
export function logoutSubmit(){
    return {type:LOGOUT}
}
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status===200&&res.data.code===0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
        //axios发送一个post的请求，参数包括了user，pwd
        axios.post('user/login',{user,pwd}).then(res=>{
            if(res.status===200&&res.data.code===0){
                // dispatch(loginSuccess(res.data.data))//后端返回回来的data，其中code表示状态码，msg表示错误消息，data具体的数据
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}
export function register({user,pwd,repeatpwd,type}){
    if(!user || !pwd||!type){
        return errorMsg('用户名密码必须填写')
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码与确认密码不同')
    }
    return dispatch=>{
    axios.post('user/register',{user,pwd,type}).then(res=>{
        if(res.status===200&&res.data.code===0){
            // dispatch(registerSuccess({user,pwd,type}))
            dispatch(authSuccess({user,pwd,type}))
        }else{
            dispatch(errorMsg(res.data.msg))
        }
    })
    }

}