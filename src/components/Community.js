import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Modal, Input } from "antd";
import "./Community.css";
import fire from "./fire.js";
import "antd/dist/antd.css";
import { SocialIcon } from "react-social-icons";

class Community extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.user.skills);
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
    console.log(this.props.user.skills);
    return (
      <div>
        <Card
          elevation={6}
          square={true}
          style={{
            margin: "1.8vw",
            width: "21vw",
            padding: "1.8vw",
            height: "60vh",
            position: "relative"
          }}
        >
          <div className="Card-content">
            <h1 className="Title">{user.name}</h1>
          </div>
          <p className="Position"> Position: {user.status}</p>
          <p className="Position"> Email: {user.email}</p>
          <p> Skillset(s) </p>
          {this.props.user.skills[5].map(skill => <li> {skill}</li>)}
          <SocialIcon url={user.linkedin} />
          &nbsp;
          <SocialIcon url={user.github} />
          <br />
          <img src={user.pictureURL} className="communitypic" />
        </Card>
      </div>
    );
  }
}

export default Community;
