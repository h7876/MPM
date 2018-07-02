import React from 'react';
import styles from './Auth.css';

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