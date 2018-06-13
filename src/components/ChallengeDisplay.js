import React from "react";
import { Card, Input } from "antd";

import "./ChallengeDisplay.css";

const LinkInput = Input.Search;

export default class ChallenegeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submittedLink: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.clickedChallenge !== nextProps.clickedChallenge) {
      console.log("New prop recieved");
      this.setState({
        //set link to data in database
        submittedLink: ""
      });
    }
  }

  handleLinkSubmit = link => {
    this.setState({
      submittedLink: link
    });
  };

  render() {
    console.log(this.state.submittedLink);
    return (
      <div>
        <Card className="card" title={this.props.clickedChallenge.title}>
          {this.props.clickedChallenge.description}akhdsfljahflkdfhakjsfh
          <br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
        </Card>

        <LinkInput
          placeholder={
            this.state.submittedLink === ""
              ? "Input link to submit"
              : this.state.submittedLink
          }
          enterButton="Submit"
          size="default"
          onSearch={link => this.handleLinkSubmit(link)}
        />
      </div>
    );
  }
}
