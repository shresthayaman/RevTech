import React, { Component } from "react";
import { Tabs, Icon, Button, Modal, Input } from "antd";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./Profile.css";
import { SocialIcon } from "react-social-icons";

const TabPane = Tabs.TabPane;

const styles = {
  card: {
    display: "flex"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
};

function callback(key) {
  console.log(key);
}

class Profile extends Component {
  state = {
    visible: false,
    name: "Nathan Park",
    position: "Intern"
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleSubmit = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  onChange = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <div className="profile-container">
          <div className="ImageDiv">
            <img src={require("./0.jpg")} className="Nathan" />
          </div>
          <div classname="card">
            <Card>
              <CardContent>
                <Typography gutterBottom variant="headline" component="h2">
                  RevTech
                </Typography>
                <Typography component="p">
                  Name: {this.state.name} Position: {this.state.position}
                </Typography>
                <br />
                <br />
                <div className="icons">
                  <SocialIcon url="https://www.linkedin.com/in/" />
                  &emsp;
                  <SocialIcon url="https://github.com/" />
                </div>
                <br /> <br /> <br />
                <div className="setting">
                  <Icon type="setting" />
                  &emsp;
                  <Button type="primary" onClick={this.showModal}>
                    {" "}
                    Edit Profile{" "}
                  </Button>
                </div>
                <div>
                  <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleCancel}
                    footer={[
                      <Button key="back" onClick={this.handleCancel}>
                        Return
                      </Button>,
                      <Button
                        key="submit"
                        type="primary"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </Button>
                    ]}
                  >
                    <Input
                      placeholder="Enter your name"
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                    &emsp;
                    <Input
                      placeholder="Enter your Linkedin Username"
                      onChange={this.handle}
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                    &emsp;
                    <Input
                      placeholder="Enter your Github Username"
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                    />
                  </Modal>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div classname="tabs">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="Daily Challenges" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Contracts" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Networks" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Profile;
