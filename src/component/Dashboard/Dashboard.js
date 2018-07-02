import React, { Component } from "react";
import MenuAppBar from "./AppBar";
import Chart from "./Chart";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { getUser } from "../../ducks/users";
import { connect } from "react-redux";
import Dash from "./Dash.css";
import SimpleModalWrapped from "./JournalModal";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 200,
    justify: "space-around",
    alignContent: "space-around",
    position: "relative",
    direction: "row"
  },
  paper: {
    height: 200,
    width: 500,
    justify: "space-around",
    alignItems: "space-around"
  },
  chart: {
    height: 300,
    width: 600,
    justify: "space-around",
    position: "relative",
    flexGrow: 1,
    zIndex: 3
  },
  appBar: {
    // justify: 'space-around'
  },
  modal: {
    position: "relative",
    left: 120
  }
});
// import {Link} from 'react-router-dom';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    let { emid, emname, emphoto } = this.props.user;
    // console.log(this.props)
    const { classes } = this.props;
    return (
      <div className="appBar" justify="space-around">
        {/* { */}
        {/* // emid ? */}
        <div>
          <Grid container className="root" spacing={16} direction="row">
            <MenuAppBar />
          </Grid>
          <Grid container className="chart" spacing={16} direction="column">
            <Grid item xs={12} position="relative" />
            <Grid item xs={12} position="relative">
              <Chart />

              {/* <Chart/>
        
            <Chart/> */}
              <div className="modal">
                <Grid item xs={12} position="relative" left="200">
                  <Paper>
                    <SimpleModalWrapped />
                  </Paper>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} position="relative">
              {/* <Chart/>
   
            <Chart/> */}
            </Grid>

            {/* <Grid item xs={16} position='relative' >
            <Chart/>
            <Chart/>
            </Grid> */}
          </Grid>
        </div>
        {/* //    :
               <p>Please login.</p> */}
        {/* // */}
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
)(Dashboard);
