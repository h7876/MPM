import React, { Component } from "react";
import MenuAppBar from "../Dashboard/AppBar";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, selectEntry } from "../../ducks/users";
import Typography from "@material-ui/core/Typography";
import EditModal from './JournalEditModal';
import './journal.css'
import SimpleModalWrapped from "../Dashboard/JournalModal";


class Journal extends Component {

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
    this.editEntry = this.editEntry.bind(this);
    this.editToggle = this.editToggle.bind(this);
    this.newEntryInput = this.newEntryInput.bind(this);
    this.getEntriescb = this.getEntriescb.bind(this);
    
  }
  setUser() {
    this.setState({ user: this.props.user });
    this.setState({ emid: this.props.user.emid });
  }

  getEntries() {
    axios.get("/api/journal/" + this.props.user.emid).then((req) => {
      console.log(req.data, "I am the axios call");
      this.setState({ entries: req.data });
      this.setState({ emid: this.props.user.emid });
    });
  }

  getEntriescb() {
    axios.get("/api/journal/" + this.props.user.emid).then((req) => {
      console.log(req.data, "I am the axios call");
      this.setState({ entries: req.data });
      this.setState({ emid: this.props.user.emid });
    });
  }

  deleteEntries(e) {
    axios
      .delete("/api/journal/" + e.target.value)
      .then(() => {
        alert("Entry Deleted!");
        this.getEntries();
      });
  }

newEntryInput(e){
  this.setState({newEntry:e.target.value})
  
}

editEntry(){
  axios.put("/api/journal/" + this.state.entryToEdit, {
    message: this.state.newEntry,
  }).then(()=> {this.getEntries()}).then(alert('post edited!')).then(()=> {this.getEntries()})
}

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
   
  };

  editToggle(e){
    this.setState({entryToEdit: e.target.value})
    this.setState({editToggle: !this.state.editToggle})
  }

  render() {
    const mappedEntries = this.state.entries.map((element, i) => {
      return (
        <div className="entry" key={element + i}>
        <div className="titlebox"> {element.emname}:</div>
            <Typography component="p">
  
              {element.message}
              <br/>
              ID :{element.id}
            </Typography>
            {this.state.editToggle === true && element.id === this.state.entryToEdit ? 
            <div>
            <input type="text" onChange={this.newEntryInput}/>
            <button onClick={this.editEntry}>Save</button> 
            <modal/>
            <button className="editButton" onClick={this.editToggle} value={element.id}> Edit Entry </button>
            <button className="deleteButton" onClick={this.deleteEntries} value={element.id}> Delete </button>
          
            </div>
            :

              <div>
                  <EditModal entryToEdit={element.id} getEntries={this.getEntries}/>
              <button className="deleteButton" onClick={this.deleteEntries} value={element.id}> Delete </button>
              </div>
            }
      
        </div>
      );
    });

    // console.log(mappedEntries);
    // const { classes } = this.props;
    // var entries = this.state.entries.map(entries => ({
    //   id: entries.id,
    //   message: entries.message
    // }));
    // console.log(entries, "entries var");
    return (
      <div className="App">
          <MenuAppBar />
        <div className="entries">
          {mappedEntries}
          </div>
          <div className="modal">
          <SimpleModalWrapped getEntries={this.getEntries}/>
          </div>
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
