import React, { Component } from "react";
import fire from "./components/fire";
import { Link, Redirect } from "react-router-dom";
import DailyChallenge from "./components/DailyChallenge";
import Profile from "./components/Profile";

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
        <div>hello world!</div>
        <button onClick={this.logout}> logout </button>
        {fire.auth().currentUser !== null && (
          <Profile passedEmail={fire.auth().currentUser.email} />
        )}
      </div>
    );
  }
}

export default DummyPage;
