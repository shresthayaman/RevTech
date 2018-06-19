import React, { Component } from "react";
import fire from "./components/fire";
import { Link, Redirect } from "react-router-dom";
import DailyChallenge from "./components/DailyChallenge";
import Profile from "./components/Profile";
import "./DummyPage.css"; 

class DummyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false
    };
  }

  logout = () => {
    fire.auth().signOut();
    this.setState({
      logout: true
    });
  };

  render() {
    if (this.state.logout) {
      return <Redirect to="/LandingPage" />;
    }
    return (
      <div>
        {/* <button onClick={this.logout}
        style={{float: "right"}}> Logout </button> */}
        <Profile/>
      </div>
    );
  }
}

export default DummyPage;
