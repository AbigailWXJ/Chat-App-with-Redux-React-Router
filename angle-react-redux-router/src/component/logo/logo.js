import React from 'react';
// import logoImg from './job.png';
import './logo.css';

class logo extends React.Component{
    render(){
        return (
            <div className='logo-container'>
                <img src={require('./job.png')} alt=""/>
            </div>)
    }
}
export default logo