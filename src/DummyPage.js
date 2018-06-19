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
      logout: false,
      toggleToAdmin: false,
      toggleToAdminNow: false
    };
  }

  logout = () => {
    fire.auth().signOut();
    this.setState({
      logout: true
    });
  };

  toggleToAdmin = () => {
    this.setState({
      toggleToAdminNow: true
    })
  }

  componentDidMount() {
    fire
      .database()
      .ref("Users")
      .on("value", snapshot => {
        let allUsers = snapshot.val();
        for (let user in allUsers) {
          if (allUsers[user].status === "admin" && allUsers[user].email === fire.auth().currentUser.email) {
            this.setState({
              toggleToAdmin: true
            })
          }
        }
      });
  }

  render() {
    if (this.state.logout) {
      return <Redirect to="/LandingPage" />;
    }
    if (this.state.toggleToAdminNow) {
      return <Redirect to="/AdminPage" />;
    }
    return (
      <div>
        {this.state.toggleToAdmin && <button onClick={this.toggleToAdmin}> Admin Mode </button>}
        <button onClick={this.logout}> logout </button>
        {fire.auth().currentUser !== null && <Profile passedEmail={fire.auth().currentUser.email} />}
      </div>
    );
  }
}

export default DummyPage;
