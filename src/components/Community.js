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
    const { user, id } = this.props;
    console.log(this.props.user);
    return (
      <div>
        <Card
          style={{
            margin: "1.8vw",
            width: "21vw",
            padding: "1.8vw",
            height: "30vh",
            position: "relative"
          }}
        >
          <div className="Card-content">
            <h1 className="Title">{user.name}</h1>
          </div>
          <p className="Position"> Position: {user.status}</p>
          <p className="Position"> Email: {user.email}</p>
          <SocialIcon url={user.linkedin} />
          <SocialIcon url={user.github} />
        </Card>
      </div>
    );
  }
}

export default Community;
