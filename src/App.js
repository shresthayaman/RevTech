import React, { Component } from "react";
import Marketplace from "./components/Marketplace.js";
import DailyChallenge from "./components/DailyChallenge";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Identity from "./components/Identity";
import SideBar from "./components/SideBar"
import fire from './components/fire';
import Landing from "./components/Landing.js"
import PendingContracts from "./components/PendingContracts"
import PendingUsers from "./components/PendingUsers"
import "./App.css"

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Landing />
        <Identity />
      </div>
    );
  }
}

export default App;
