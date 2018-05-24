import React, { Component } from 'react';
import './App.css';
import Auth from './component/Auth/Auth';
// import Attendance from './component/Attendance/Attendance';
// import Competencies from './component/Competencies/Competencies';
import Dashboard from './component/Dashboard/Dashboard';
// import Journal from './component/Journal/Journal';
// import Performance from './component/Performance/Performance';
import {HashRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route path= '/' component = {Auth} exact/>
            <Route path= '/dashboard' component = {Dashboard} />

          </Switch>
          </HashRouter>
      </div>
    );
  }
}

export default App;
