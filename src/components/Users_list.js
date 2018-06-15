import React, { Component } from "react";
import Community from "./Community.js";
import Community_css from "./Community.css";
import fire from "./fire.js";

class Users_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedUsers: [],
      id: "nyp5aa@virginia.edu"
    };
  }
  componentDidMount() {
    console.log("Hello11");
    const usersRef = fire.database().ref("Users");
    usersRef.on("value", snapshot => {
      let Users = snapshot.val();
      console.log(Users);
      let newState = [];
      for (let User in Users) {
        if (Users[User].approve === true) {
          newState.push({
            name: Users[User].name,
            status: Users[User].status,
            email: Users[User].email,
            github: Users[User].github,
            linkedin: Users[User].linkedin,
            approve: Users[User].approve,
            gradYear: Users[User].gradYear,
            id: User
          });
        }
      }
      this.setState({
        approvedUsers: newState
      });
    });
  }
  render() {
    console.log("Hello");
    let userDisplays = this.state.approvedUsers.map(con => {
      return <Community user={con} id={this.state.id} />;
    });
    return <div className="flex-container">{userDisplays}</div>;
  }
}

export default Users_list;
