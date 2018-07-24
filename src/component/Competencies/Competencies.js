import React, {Component} from 'react';
import MenuAppBar from '../Dashboard/AppBar';
import Grid from '@material-ui/core/Grid';
import {getUser} from '../../ducks/users';
import {connect} from 'react-redux';
import CompetenciesChart from './CompetenciesChart';
import './Comp.css';

export  class Competencies extends Component{
    componentDidMount(){
        this.props.getUser()
    }
    
    render(){
        // let {emid, emname, emphoto} = this.props.user;
        // console.log(this.props)
        // const { classes } = this.props;
        return(
            <div>
            <div className="compChart">
            <CompetenciesChart/>
               </div>
               <MenuAppBar />
               </div>
        )
    }
}
function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Competencies)