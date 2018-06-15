import React, { Component } from "react";
import DailyChallenge from "./components/DailyChallenge";
import InputDetails from "./components/ContractInputDetails";
import DisplayContracts from "./components/ContractInput";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SideBar from "./components/SideBar"
import fire from './components/fire';
import Identity from './components/Identity';
import Landing from "./components/Landing.js"
import PendingContracts from "./components/PendingContracts"
import PendingUsers from "./components/PendingUsers"

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Identity />
      </div>
    );
  }
}

export default App;