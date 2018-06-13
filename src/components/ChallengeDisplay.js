import React from "react";
import { Card } from "antd";

import "./ChallengeDisplay.css";

export default class ChallenegeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {console.log("I am in display!")}

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
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
          asdfasdfasdfasdfadsfasdfadsf<br />
          sdfasdfaasdfasfasdfasdfasdfasdf<br />
        </Card>
      </div>
    );
  }
}
