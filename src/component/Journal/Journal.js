import React, { Component } from "react";
import MenuAppBar from "../Dashboard/AppBar";
import axios from "axios";
import { connect } from "react-redux";
import { getUser, selectEntry } from "../../ducks/users";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GridLayout from "react-grid-layout";
import Checkbox from "./Checkbox";
import JournalEditModal from './JournalEditModal';
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
    paddingTop: 200
  },
  paper: {
    height: 200,
    width: 200,
    justify: "space-around",
    alignItems: "space-around",
    paddingTop: 200
  },
  entries: {
    zIndex: 40,
    height: 500,
    width: 300,
    justify: "space-around",
    alignItems: "space-around",
    position: "absolute",
    direction: "column",
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
      checkedA: true,
      editToggle: false,
      newEntry: ''
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
      console.log(req.data[0], "I am the axios call");
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
  deleteEntries() {
    axios
      .delete("/api/journal/" + this.props.entryToDelete)
      .then((req, res) => {
        alert("Entry Deleted!");
        this.getEntries();
      });
  }


editEntry(){
  axios.put("/api/journal/" + this.props.entryToDelete, {
    emid: this.props.user.emid,
    message: this.state.newEntry,
  }).then((req, res)=> {
    this.getEntries()
  }).catch(alert('error'))
}

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    console.log(event.target);
  };

  editToggle(){
    this.setState({editToggle: !this.state.editToggle})
  }

  // this.state.entries.map((element, i)=> {
  //   return element.id
  render() {
    // const messageID = [];
    const mappedEntries = this.state.entries.map((element, i) => {
      return (
        <Grid
          container
          className={styles.root}
          spacing={16}
          direction="column"
          key={element + i}
        >
          <Grid item xs={12} position="center" justify="space-around" />
          <Paper className={styles.entries}>
            <Typography component="p">
              {element.message}
              <Checkbox label={element.id} />
            </Typography>
          </Paper>
        </Grid>
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
        <Grid container className={styles.root} spacing={16} direction="column">
          <MenuAppBar />

          {/* <p>{_.map(this.state.entries, "message", "id")}</p> */}
          <Grid item xs={12} position="center" justify="space-around" />
          {mappedEntries}
          <Button onClick={this.deleteEntries} width={20} height={10} justify="space-around">
            {" "}
            Delete{" "}
          </Button>
         
          <JournalEditModal/>
            
        </Grid>
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
