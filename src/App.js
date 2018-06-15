import React, { Component } from "react";
import "./App.css";
import DailyChallenge from "./components/DailyChallenge";
import InputDetails from "./components/ContractInputDetails";
import DisplayContracts from "./components/ContractInput";
import SideBar from "./components/SideBar";
import fire from "./components/fire";
import Identity from "./components/Identity";
import Landing from "./components/Landing.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractList: []
    };
  }

  updateContracts(newContract) {
    let temp = this.state.contractList;
    temp.push(newContract);
    this.setState({
      contractList: temp
    });
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
