import React, { Component } from "react";
import { Tabs, Icon, Button, Modal, Input } from "antd";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./Profile.css";
import Community from "./Community.js";
import { SocialIcon } from "react-social-icons";
import fire from "./fire";
import Users_list from "./Users_list";
import Profile_pic from "./Profile_pic";
import DailyChallenge from "./DailyChallenge";
import MarketDisplay from "./MarketDisplay";
import Marketplace from "./Marketplace";

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "Nathan Park",
      namedisplay: "Nathan Park",
      position: "Intern",
      linkedin: "",
      github: "",
      users: [],
      complete: false,
      link_disabled: false,
      git_disabled: false,
      submit_disabled: true,
      id: this.props.passedEmail,
      loginuser: "",
      buttontitle: "Add",
      loggedin: true,
      user: null,
      currentUser: [
        {
          name: "",
          status: "",
          email: "",
          github: "https://github.com/",
          linkedin: "https://www.linkedin.com/",
          approve: false,
          gradYear: 2021,
          id: "",
          pictureURL: ""
        }
      ]
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
      linkedin: "",
      github: "",
      submit_disabled: true
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      submit_disabled: false
    });
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(
          { user, loggedin: true, id: fire.auth().currentUser.email },
          localStorage.setItem("user", user.uid)
        );
      } else {
        this.setState({ user: null }, localStorage.removeItem("user"));
      }
    });
    // if (fire.auth().currentUser != null) {
    //   // console.log("Logged in:" + fire.auth().currentUser.email);
    //   this.setState({
    //     id: fire.auth().currentUser.email
    //   });
    // }
    const usersRef = fire.database().ref("Users");
    console.log(usersRef);
    usersRef.on("value", snapshot => {
      let users = snapshot.val();
      let newState = [];
      for (let user in users) {
        if (users[user].email === this.state.id) {
          newState.push({
            name: users[user].name,
            approve: users[user].approve,
            linkedin: users[user].linkedin,
            status: users[user].status,
            email: users[user].email,
            gradYear: users[user].gradYear,
            github: users[user].github,
            id: user,
            pictureURL: users[user].pictureURL
          });
        }
      }
      if (this.state.loggedin == true) {
        console.log("Loggin In is true");
        this.setState({
          currentUser: newState,
          complete: true
        });
      } else {
        this.setState({
          complete: false
        });
      }
    });
  }

  handleSubmit = e => {
    this.setState({
      namedisplay: this.state.name,
      visible: false,
      buttontitle: "Edit",
      submit_disabled: true
    });
    // console.log(this.state.currentUser);
    // console.log(this.state.currentUser[0].id);

    if (
      this.state.complete == true &&
      this.state.linkedin == "" &&
      this.state.github != ""
    ) {
      // console.log(this.state.currentUser[0].id);
      fire
        .database()
        .ref(`/Users/${this.state.currentUser[0].id}`)
        .update(
          {
            github: this.state.github
          },
          function(error) {
            if (error) {
              // The write failed...
            } else {
              // Data saved successfully!
            }
          }
        );
    }
    if (
      this.state.complete == true &&
      this.state.linkedin != "" &&
      this.state.github == ""
    ) {
      // console.log(this.state.currentUser[0].id);
      fire
        .database()
        .ref(`/Users/${this.state.currentUser[0].id}`)
        .update(
          {
            linkedin: this.state.linkedin
          },
          function(error) {
            if (error) {
              // The write failed...
            } else {
              // Data saved successfully!
            }
          }
        );
    }
  };

  render() {
    // console.log(this.state.currentUser[0].pictureURL);

    return (
      <div>
        <div className="profile-container">
          <div className="textInfo">
            <Card
              classname="card"
              style={{
                width: "100vw",
                height: "35vh",
                position: "relative",
                marginleft: "auto",
                marginrright: "auto",
                margintop: "4%",
                paddingBottom: "20px",
                zIndex: 3
              }}
            >
              <div className="ImageDiv">
                <img
                  src={this.state.currentUser[0].pictureURL}
                  className="Nathan"
                />
              </div>

              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  RevTech
                </Typography>
                {this.state.complete == true && (
                  <Typography component="p">
                    Name: {this.state.currentUser[0].name} <br /> Position:{" "}
                    {this.state.currentUser[0].status} <br />
                    Email: {this.state.currentUser[0].email}
                  </Typography>
                )}

                <div className="icons">
                  <SocialIcon url={this.state.currentUser[0].linkedin} />
                  <SocialIcon
                    disabled={this.state.git_disabled}
                    url={this.state.currentUser[0].github}
                  />
                </div>

                <div className="setting">
                  <Button type="primary" onClick={this.showModal}>
                    <Icon type="setting" /> Edit Profile
                  </Button>
                  <Button
                    onClick={this.props.logout}
                    style={{ float: "right" }}
                  >
                    {" "}
                    Logout
                  </Button>
                </div>

                {/* Edit Profile */}
                <div>
                  <Modal
                    title="Edit Profile "
                    visible={this.state.visible}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>
                        Done
                      </Button>,
                      <Button
                        key="submit"
                        disabled={this.state.submit_disabled}
                        type="primary"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </Button>
                    ]}
                  >
                    <Input
                      name="linkedin"
                      placeholder="Enter your Linkedin URL"
                      onChange={this.onChange}
                      value={this.state.linkedin}
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />

                    {/* Github Input */}
                    <Input
                      name="github"
                      onChange={this.onChange}
                      value={this.state.github}
                      placeholder="Enter your Github URL"
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                    <p> Add Photo: </p>
                    <Profile_pic user={this.state.currentUser[0]} />
                  </Modal>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div classname="tabs">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Daily Challenges" key="1">
              <DailyChallenge />
            </TabPane>
            <TabPane tab="Contracts" key="2">
              <Marketplace />
            </TabPane>
            <TabPane tab="Network" key="3">
              <Users_list />
            </TabPane>
          </Tabs>
        </div>
        <div className="spacer" />
      </div>
    );
  }
}

export default Profile;
