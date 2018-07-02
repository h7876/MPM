import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import JournalInputBox from '../Dashboard/JournalInputBox';
import {connect} from 'react-redux';
import {getUser, addEntry, selectEntry} from '../../ducks/users';
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

class JournalEditModal extends React.Component {
  componentDidMount(){
    console.log(this.props + "modalpropsYO")
    this.props.getUser()
    this.props.addEntry()
    this.getEntries();


  }

  constructor(props){
    super(props)
  this.state = {
    open: false,
    show: true,
    entry: '',
    entries: [],
    emid: '',
    entryToEdit: ''
  };
  this.getEntries = this.getEntries.bind(this);
  this.handleClose = this.handleClose.bind(this);

  }

  getEntries() {
    axios.get("/api/journal/" + this.props.user.emid).then((req, res) => {
      console.log(req.data[0], "I am the axios call");
      this.setState({ entries: req.data });
      this.setState({ emid: this.props.user.emid });
    });
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
        axios.put("/api/journal/" + this.props.entryToEdit, {
            message: this.props.entry,
          }).then((req, res)=> {
            alert("Post edited!");
          }).then(this.handleClose()).then(()=> {this.getEntries()})
    }

      
  
  render() {
    const { classes } = this.props;
    console.log(this.props, "I'm on the modal page!")
    console.log(this.props.user.emid)
    return (
      <div>
        <Typography gutterBottom></Typography>
        {this.state.show === true ? <Button variant="contained" color="primary" onClick={this.handleOpen}>Edit Entry</Button>
        : <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Edit Entry
            </Typography>
            <JournalInputBox/>
            < Button onClick = {this.handleSave} > Save </Button>
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

JournalEditModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
      user:state.user,
      entry: state.entry ,
      entryToDelete: state.entryToDelete
  }
}


const modal = withStyles(styles)(JournalEditModal);

export default connect(mapStateToProps, {getUser, addEntry, selectEntry})(modal);