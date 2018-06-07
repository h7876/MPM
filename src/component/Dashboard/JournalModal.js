import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import JournalInputBox from './JournalInputBox';
import {connect} from 'react-redux';
import {getUser, addEntry} from '../../ducks/users';
import axios from 'axios';



function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4 ,
    justifyContent: 'center'
  },
});

class SimpleModal extends React.Component {
  componentDidMount(){
    this.props.getUser()
    this.props.addEntry()
  }
  constructor(){
    super()
  this.state = {
    open: false,
    show: true,
    entry: ''
  };
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.setState({show: false})
    console.log(this.state.open)
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({show: true})
    console.log(this.state.open)
  };


    handleSave = () => {
      axios.post('/api/journal/', {
        emid: this.props.user.emid,
        message: this.props.entry,
      }).then(function (response){
       console.log(response)
      }).then(()=> { this.setState({ open: false });
      this.setState({show: true})}).catch(function (error){
        console.log(error);
      })
    }
  
  
  render() {
    const { classes } = this.props;
    console.log(this.props, "I'm on the modal page!")
    console.log(this.props.user.emid)
    return (
      <div>
        <Typography gutterBottom></Typography>
        {this.state.show === true ? <Button onClick={this.handleOpen}>New Journal Entry</Button>
        : <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              New Journal entry
            </Typography>
            <JournalInputBox/>
            < Button onClick = {this.handleSave} >Add Entry </Button>
            <Typography variant="subheading" id="simple-modal-description">
            {/* Subtext */}
            </Typography>
            {/* <SimpleModalWrapped /> */}
          </div>
        </Modal>}
        
        
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
      user:state.user,
      entry: state.entry 
  }
}


const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default connect(mapStateToProps, {getUser, addEntry})(SimpleModalWrapped);