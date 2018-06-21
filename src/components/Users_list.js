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
  compare = (user1, user2) => {
    if (user1.name < user2.name) {
      return -1;
    }
    if (user1.name > user2.name) {
      return 1;
    }
    return 0;
  };

  componentDidMount() {
    console.log("Hello11");
    const usersRef = fire.database().ref("Users");
    usersRef.on("value", snapshot => {
      let Users = snapshot.val();
      console.log(Users);
      let newState = [];
      for (let User in Users) {
        if (
          (Users[User].approve === true &&
            Users[User].linkedin != "" &&
            Users[User].github != "",
            Users[User].skills !== null)
        ) {
          newState.push({
            name: Users[User].name,
            status: Users[User].status,
            email: Users[User].email,
            github: Users[User].github,
            linkedin: Users[User].linkedin,
            approve: Users[User].approve,
            gradYear: Users[User].gradYear,
            id: User,
            pictureURL: Users[User].pictureURL,
            skills: Users[User].skills
          });
        } else if (
          Users[User].approve === true &&
          Users[User].linkedin === "" &&
          Users[User].github === ""
        ) {
          newState.push({
            name: Users[User].name,
            status: Users[User].status,
            email: Users[User].email,
            github: "",
            linkedin: "",
            approve: Users[User].approve,
            gradYear: Users[User].gradYear,
            id: User,
            pictureURL: Users[User].pictureURL,
            skills: Users[User].skills
          });
        }
      }

      let newState2 = newState.sort(this.compare);
      this.setState({
        approvedUsers: newState2
      });
    });
  }
  render() {
    console.log(this.state.newState2);
    let userDisplays = this.state.approvedUsers.map(con => {
      return <Community user={con} id={this.state.id} />;
    });
    return <div className="flex-container">{userDisplays}</div>;
  }
}

export default Users_list;
