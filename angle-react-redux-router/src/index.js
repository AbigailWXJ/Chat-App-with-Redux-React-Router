import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import reducers from './reducers'
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/AuthRoute/AuthRoute';
import BossInfo from  './container/bossinfo/bossinfo';
import GeniusInfo from './container/geniusinfo/geniusinfo';
import './index.css';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat'

// create a store by reducer
const store=createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f=>f
    ))
//boss genius me(个人中心),msg(消息列表) 4个页面
    ReactDOM.render(
        (<Provider store={store}>
            <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}></Route>
                    <Route path='/geniusinfo' component={GeniusInfo}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/chat/:user' component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
            </BrowserRouter>
        </Provider>),
        document.getElementById('root')
    )
