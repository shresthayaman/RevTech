import React, { Component } from "react";
import "./App.css";
import fire from './components/fire';
import Landing from "./components/Landing.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing/>
      </div>
    );
  }
}

export default App;