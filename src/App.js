import React, { Component } from "react";
import "./App.css";
import fire from './components/fire';
import Identity from './components/Identity';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Identity />
      </div>
    );
  }
}

export default App;
