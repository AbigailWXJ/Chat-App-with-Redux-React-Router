


export function getRedirectPath({type,avatar}){
    //根据用户信息。返回跳转页面地址
    // 根据user.type 类型跳转到boss页面和genius页面
    // 根据用户头像avatar 跳转到bossinfo /geniusinfo
    // 
    let url=(type==='boss')?'/boss':'/genius';
    if(!avatar){
        ////表示没有头像信息，需要去完善用户信息（本项目中默认有了头像的情况，就代表已经完善了用户信息，就不需要跳转到完善信息页面去完善信息）
        url +='info'
    }
    return url
}