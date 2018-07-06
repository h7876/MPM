import React from 'react';
 import './Auth.css';

import LoginCard from './LoginCard';



export default function Login(){
    return(
        <div className= "journal">
            <div className= "Card">
            <a href={process.env.REACT_APP_LOGIN}>
          <LoginCard/>
          </a>
            </div>
            
        </div>
    )
}