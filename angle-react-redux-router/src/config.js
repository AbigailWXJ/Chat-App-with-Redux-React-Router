import axios from 'axios';
import {Toast} from 'antd-mobile';
//拦截请求
//Toast.loading(content,duration,onClose,mask)分别表示提示内容，默认无
//自动关闭的延时，单位秒，默认值为3秒，关闭后回调，默认为无，是否显示透明蒙层，防止触摸穿透，默认为true
axios.interceptors.request.use(function(config){
    Toast.loading('loading',0)
    return config
})
// 拦截响应
axios.interceptors.response.use(function(config){
    Toast.hide() //只要返回立马关闭
    return config
})