import React, { Component } from "react";
import MenuAppBar from "./AppBar";
import Chart from "./Chart";
import CompetenciesChart from "../Competencies/CompetenciesChart";
import { getUser } from "../../ducks/users";
import { connect } from "react-redux";
import  "./Dash.css";
import SimpleModalWrapped from "./JournalModal";



export class Dashboard extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    // let { emid, emname, emphoto } = this.props.user;
    // // console.log(this.props)
    // const { classes } = this.props;
    return (
      <div className="appBar" justify="space-around">

        <MenuAppBar />
        <div className ="content">
  
        <Chart />
        <div className="chart">
        <CompetenciesChart/>
        </div>
              <div className="modal">
                    <SimpleModalWrapped />
              </div>

        </div>

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
