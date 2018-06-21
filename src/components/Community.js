import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Modal, Input, Tabs } from "antd";
import "./Community.css";
import fire from "./fire.js";
import "antd/dist/antd.css";
import { SocialIcon } from "react-social-icons";

const TabPane = Tabs.TabPane;

class Community extends Component {
  constructor(props) {
    super(props);
  }

  getStatus = (status) => {
    if (status === "admin") {
      return "Administrator"
    }
    else if (status === "intern") {
      return "Intern"
    }
    else {
      return "Alumnus"
    }
  }

  render() {
    const { user, id } = this.props;
    this.props.user.skills.push([]);
    if (
      this.props.user.skills[0].software === true &&
      this.props.user.skills[5].includes("Software Engineering") == false
    ) {
      this.props.user.skills[5].push("Software Engineering");
    }
    if (
      this.props.user.skills[1].media === true &&
      this.props.user.skills[5].includes("Digital Media") == false
    ) {
      this.props.user.skills[5].push("Digital Media");
    }
    if (
      this.props.user.skills[2].data === true &&
      this.props.user.skills[5].includes("Data Science") == false
    ) {
      this.props.user.skills[5].push("Data Science");
    }
    if (
      this.props.user.skills[3].strat === true &&
      this.props.user.skills[5].includes("Digital Strategy") == false
    ) {
      this.props.user.skills[5].push("Digital Strategy");
    }
    if (
      this.props.user.skills[4].entre === true &&
      this.props.user.skills[5].includes("Entreprenuership") == false
    ) {
      this.props.user.skills[5].push("Entreprenuership");
    }



    return (
      <Card className="individual-profiles" classes="div">
        <div>
          <div className="name-container">
            {user.name}
          </div>
        </div>
        <img src={user.pictureURL} className="picture-container" />
        <Tabs defaultActiveKey="1">
          <TabPane tab="General Contact" key="1">
            <div className="individual-info-status">
              {this.getStatus(user.status)}
            </div>
            <div className="individual-info">
              {user.email}
            </div>
            <div className="individual-info">
              {user.linkedin && <SocialIcon url={user.linkedin} className="link-icons" />}
              {user.github && <SocialIcon url={user.github} className="link-icons" />}
            </div>
          </TabPane>
          <TabPane tab="Skillset" key="2">
            <div className="scrollable" >
              {this.props.user.skills[5].map(skill => <div className="individual-info"> {skill}</div>)}
            </div>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

export default Community;
