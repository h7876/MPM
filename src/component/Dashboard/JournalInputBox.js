import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {connect} from 'react-redux';
import {getUser, addEntry} from '../../ducks/users';

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
    }

  render() {
    // let {emid} = this.props.user
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

function mapStateToProps(state){
    return{
        user:state.user,
        entry: state.entry 
    }
}

export const styling= withStyles(styles)(JournalInputBox);
export default connect(mapStateToProps, {getUser, addEntry})(JournalInputBox, (styling))


