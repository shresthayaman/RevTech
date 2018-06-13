import React, { Component } from "react";
import "./App.css";
import fire from './components/fire';
import Identity from './components/Identity';
import Landing from "./components/Landing.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing/>
        <Identity />
      </div>
    );
  }
}

export default App;