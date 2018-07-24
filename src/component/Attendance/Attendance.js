import React, {Component} from 'react';
import MenuAppBar from '../Dashboard/AppBar';
import {getUser} from '../../ducks/users';
import {connect} from 'react-redux';
import AttTable from './Table';
import './Attendance.css';

export  class Attendance extends Component{
    componentDidMount(){
        this.props.getUser()
    }
    
    render(){
        // let {emid, emname, emphoto} = this.props.user;
        // console.log(this.props)
        // const { classes } = this.props;
        return(
            <div>
                <MenuAppBar />
            <div className="table">
            <AttTable/>
                </div>
                </div>
        )
    }
}
function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUser})(Attendance)