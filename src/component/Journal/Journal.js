import React, { Component } from "react";
import MenuAppBar from "../Dashboard/AppBar";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, selectEntry } from "../../ducks/users";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridLayout from "react-grid-layout";
import Checkbox from "./Checkbox";
import JournalEditModal from './JournalEditModal';
import journal from './journal.css';
var _ = require("lodash");

const styles = {
  root: {
    display: "flex",
    flexGrow: 1,
    height: 200,
    justify: "space-around",
    alignContent: "space-around",
    position: "absolute",
    direction: "column",
    paddingTop: 200,
    marginTop: 400
  },
  paper: {
  
    justify: "space-around",
    alignItems: "space-around",
    marginTop: 400,
    paddingTop: 400
   
  },
  entries: {
    zIndex: 40,
    height: 500,
    width: 300,
    justify: "space-around",
    alignItems: "space-around",
    position: "absolute",
    direction: "column",
    justifyContent: 'center',
    paddingTop: 200
  }
};

class Journal extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  componentDidMount() {
    this.props.getUser();
    this.setUser();
    console.log(this.state.user);
    this.getEntries();
  }


  constructor() {
    super();
    this.state = {
      entries: [],
      user: "",
      emid: "",
      entryID: [],
      entryToDelete: [],
      checkedA: false,
      editToggle: false,
      newEntry: '',
      entryToEdit: ''
    };
    this.setUser = this.setUser.bind(this);
    this.getEntries = this.getEntries.bind(this);
    this.deleteEntries = this.deleteEntries.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.editEntry = this.editEntry.bind(this);
    this.editToggle = this.editToggle.bind(this);
    

  }
  setUser() {
    this.setState({ user: this.props.user });
    this.setState({ emid: this.props.user.emid });
  }


  getEntries() {
    axios.get("/api/journal/" + this.props.user.emid).then((req, res) => {
      console.log(req.data, "I am the axios call");
      this.setState({ entries: req.data });
      this.setState({ emid: this.props.user.emid });
    });
  }

  //checkboxLand

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  createCheckboxes = () =>
    this.state.entries.map((element, i) => {
      this.createCheckbox(element.message);
    });
  //end of checkboxLand
  deleteEntries(e) {
    axios
      .delete("/api/journal/" + e.target.value)
      .then((req, res) => {
        alert("Entry Deleted!");
        this.getEntries();
      });
  }


editEntry(e){
  axios.put("/api/journal/" + e.target.value, {
    emid: this.props.user.emid,
    message: this.state.newEntry,
  }).then(()=> this.getEntries()).catch(alert('error'))
}

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    console.log(event.target);
  };

  editToggle(e){
    this.setState({entryToEdit: e.target.value})
    this.setState({editToggle: !this.state.editToggle})
    
  }

  render() {

    const mappedEntries = this.state.entries.map((element, i) => {
      return (
        <div className="entry">
        
        <div>
        
            <Typography component="p">
            
             {element.emname}:
              <br/>
              {element.message}
            </Typography>
            <button onClick={this.editToggle} value={element.id}> Edit Entry </button>
            <button onClick={this.deleteEntries} value={element.id}> Delete </button>
            </div>
        </div>
      );
    });

    console.log(mappedEntries);
    const { classes } = this.props;
    let { emid, emname, emphoto } = this.props.user;
    var entries = this.state.entries.map(entries => ({
      id: entries.id,
      message: entries.message
    }));
    console.log(entries, "entries var");
    return (
      <div className="App">
    
          <MenuAppBar />

        <div className="entries">
          {mappedEntries}
  
          
          </div>
        <div className="edit"><JournalEditModal entryToDelete={this.state.entryToDelete}/></div>
        <div className="delete"><Button variant="contained" color="secondary" onClick={this.deleteEntries}> Delete </Button></div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
    entryToDelete: state.entryToDelete
  };
}

export default connect(
  mapStateToProps,
  { getUser, selectEntry }
)(Journal);
