import React, { Component } from "react";
import MenuAppBar from "../Dashboard/AppBar";
import axios from "axios";
import { connect } from "react-redux";
import { getUser } from "../../ducks/users";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography"
var _ = require("lodash");

const styles = {
  root: {
    display:"flex",
    flexGrow: 1,
    height: 200,
    justify: "space-around",
    alignContent: "space-around",
    position: "relative",
    direction: "row-wrap"
  },
  paper: {
    height: 200,
    width: 200,
    justify: "space-around",
    alignItems: "space-around"
  },
  entries: {
      height: 500,
      width: 300,
      justify: "space-around",
      alignItems: "space-around"
  }
};

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
      user: ""
    };
    this.setUser = this.setUser.bind(this);
    this.getEntries = this.getEntries.bind(this);
  }
  setUser() {
    this.setState({ user: this.props.user });
  }

  getEntries() {
    axios.get("/api/journal/").then((req, res) => {
      console.log(req.data[0], "I am the axios call");
      this.setState({ entries: req.data });
    //   var newState = _.map(this.state.entries.message);
    //   this.setState({ entries: newState });
    //   console.log(this.state.entries, "I am the entries data");
    });
  }

  render() {
    const mappedEntries = this.state.entries.map((element, i) => {
        return (
            <Paper className = {styles.root}>
            <Typography component="p">
                {element.message}
                </Typography>
            </Paper>
            
        )
    })

    console.log(mappedEntries)
    const { classes } = this.props;
    let { emid, emname, emphoto } = this.props.user;
    var entries = this.state.entries.map(entries => ({
      id: entries.id,
      message: entries.message
    }));
    console.log(entries, "entries var");
    return (
      <div className="App">
        <Grid container className={styles.root} spacing={16}direction="column">
          <MenuAppBar />

          {/* <p>{_.map(this.state.entries, "message", "id")}</p> */}
          <Grid item xs={12} position="relative"justify = 'space-around' />
            {mappedEntries}
        </Grid>
        

        
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(Journal);
