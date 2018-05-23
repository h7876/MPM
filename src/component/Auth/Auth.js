import React from 'react';
import {Link} from 'react-router-dom';
// import styles from './Auth.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LoginCard from './LoginCard';
import Auth from './Auth.css'


export default function Login(){
    return(
        <div className= "App">
            <div className= "Card">

          <LoginCard/>
           
    
            </div>
            
        </div>
    )
}