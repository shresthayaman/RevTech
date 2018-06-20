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
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

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
      software: false,
      data: false,
      media: false,
      strat: false,
      entre: false,
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
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  componentDidMount() {
    const usersRef = fire.database().ref("Users");
    console.log(usersRef);
    usersRef.on("value", snapshot => {
      let users = snapshot.val();
      console.log(users);
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
          skills: [
            { software: this.state.software },
            { media: this.state.media },
            { data: this.state.data },
            { strat: this.state.strat },
            { entre: this.state.entre }
          ],
          github: this.state.github
        },
        function (error) {
          if (error) {
            // The write failed...
          } else {
            // Data saved successfully!
          }
        }
        );
    } else if (
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
          linkedin: this.state.linkedin,
          skills: [
            { software: this.state.software },
            { media: this.state.media },
            { data: this.state.data },
            { strat: this.state.strat },
            { entre: this.state.entre }
          ]
        },
        function (error) {
          if (error) {
            // The write failed...
          } else {
            // Data saved successfully!
          }
        }
        );
    } else {
      // console.log(this.state.currentUser[0].id);
      fire
        .database()
        .ref(`/Users/${this.state.currentUser[0].id}`)
        .update(
        {
          linkedin: this.state.linkedin,
          github: this.state.github,
          skills: [
            { software: this.state.software },
            { media: this.state.media },
            { data: this.state.data },
            { strat: this.state.strat },
            { entre: this.state.entre }
          ]
        },
        function (error) {
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
    console.log(this.state);
    return (
      <div>
        {this.state.complete ? (
          <div>
            <div className="profile-container">
              <div className="ImageDiv">
                <img
                  src={this.state.currentUser[0].pictureURL}
                  className="Nathan"
                />
              </div>
              <div>
                <Card
                  classname="card"
                  style={{
                    margin: "1vw",
                    width: "90vw",
                    height: "35vh",
                    position: "relative"
                  }}
                >
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
                    <br />
                    <div className="icons">
                      <SocialIcon url={this.state.currentUser[0].linkedin} />
                      &emsp;
                      <SocialIcon
                        disabled={this.state.git_disabled}
                        url={this.state.currentUser[0].github}
                      />
                    </div>
                    <br />
                    <div className="setting">
                      <Icon type="setting" />
                      &emsp;
                      <Button type="primary" onClick={this.showModal}>
                        {" "}
                        Edit Profile
                      </Button>
                      <Button
                        onClick={this.props.logout}
                        style={{ float: "right" }}
                      >
                        Logout
                      </Button>
                      {this.props.isAdmin && <Button
                        onClick={this.props.toggleToAdmin}
                      >
                        Admin View
                      </Button>}
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
                            Return
                          </Button>,
                          <Button
                            key="submit"
                            /* disabled={this.state.submit_disabled} */
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
                        &emsp;
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
                        <div>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">
                              Choose your Skillset(s)
                            </FormLabel>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.software}
                                    onChange={this.handleChange("software")}
                                    value="software"
                                  />
                                }
                                label="Software Engineering"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.data}
                                    onChange={this.handleChange("data")}
                                    value="data"
                                  />
                                }
                                label="Data Science"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.media}
                                    onChange={this.handleChange("media")}
                                    value="media"
                                  />
                                }
                                label="Digital Media"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.strat}
                                    onChange={this.handleChange("strat")}
                                    value="strat"
                                  />
                                }
                                label="Digital Strategy"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={this.state.entre}
                                    onChange={this.handleChange("entre")}
                                    value="entre"
                                  />
                                }
                                label="Entrepreneurship"
                              />
                            </FormGroup>
                          </FormControl>
                        </div>
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
                  <Marketplace id={this.props.passedEmail} />
                </TabPane>
                <TabPane tab="Network" key="3">
                  <Users_list />
                </TabPane>
              </Tabs>
            </div>
          </div>
        ) : (
            <p>Loading...</p>
          )}
      </div>
    );
  }
}

export default Profile;
