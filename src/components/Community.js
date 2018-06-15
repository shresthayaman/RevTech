import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Modal, Input } from "antd";
import "./Community.css";
import fire from "./fire.js";
import "antd/dist/antd.css";

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
            height: "35vh",
            position: "relative"
          }}
        >
          <div className="Card-content">
            <h1 className="Title">{user.name}</h1>
          </div>
        </Card>
      </div>
    );
  }
}

export default Community;
