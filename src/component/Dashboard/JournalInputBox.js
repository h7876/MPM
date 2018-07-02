import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import {getUser, addEntry} from '../../ducks/users';
// import {addEntry} from '../../ducks/entries';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class JournalInputBox extends React.Component {
    componentDidMount(){
        this.props.getUser()
    }
    constructor(){
        super()
  this.state = {
   entry: '',
   user: ''
  };
  // this.handleChange = this.handleChange.bind(this)

    }
  // handleChange = entry => event => {
  //   this.setState({
  //     entry: event.target.value,
  //     user: this.props.user.emid
  //   }),
  //   console.log(this.state)
  //   console.log(this.props.user);
  // };

// handleChange = entry => event => {
// this.setState({entry: event.target.value,
// user: this.props.user.emid})
// console.log(this.state, "i'm the state")
// this.props.addEntry(this.state.entry)
// console.log(this.props.entries)
// }

  render() {
    // const { classes } = this.props;
    let {emid} = this.props.user
    console.log(this.props)
    return (
      <form className='container' noValidate autoComplete="off">


        <TextField
        onChange = {(e)=> this.props.addEntry(e.target.value) +console.log(this.props)}
          id="textarea"
          label="Type here"
          placeholder="text"
          multiline
          className='textField'
          margin="normal"
        entry = {this.state.entry}/>
        
      </form>
      
    );
  }
}

JournalInputBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        user:state.user,
        entry: state.entry 
    }
}

export const styling= withStyles(styles)(JournalInputBox);
export default connect(mapStateToProps, {getUser, addEntry})(JournalInputBox, (styling))


