import React, {Component} from 'react';
import Chart from '../Dashboard/Chart';
import MenuAppBar from '../Dashboard/AppBar';


// import {Link} from 'react-router-dom';

export default class Performance extends Component{
    render(){
        return(
            <div>
                <MenuAppBar/>
 
                <Chart/>


            </div>
            
        )
    }
}