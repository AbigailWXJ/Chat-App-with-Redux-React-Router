


export function getRedirectPath({type,avatar}){
    //根据用户信息。返回跳转页面地址
    // 根据user.type 类型跳转到boss页面和genius页面
    // 根据用户头像avatar 跳转到bossinfo /geniusinfo
    // 
    let url=(type==='boss')?'/boss':'/genius';
    if(!avatar){
        //有头像就表示信息完善了，没有头像就需要去完善用户信息
        url +='info'
    }
    return url
}
export function getChatId(userId,targetId){
    return [userId,targetId].sort().join('_')
}