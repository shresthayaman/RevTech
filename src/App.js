import React, { Component } from "react";
import "antd/dist/antd.css";
import Landing from "./components/Landing.js";
import "./App.css";
import "./components/Community.css";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Landing />
      </div>
    );
  }
}

export default App;
