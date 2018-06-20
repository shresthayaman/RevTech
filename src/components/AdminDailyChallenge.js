import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import AdminChallengeEditor from "./AdminChallengeEditor";
import AdminAddChallenge from "./AdminAddChallenge";
import AdminChallengeSubmission from "./AdminChallengeSubmissions";

const TabPane = Tabs.TabPane;

export default class AdminDailyChallenege extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeArray: [],
      clickedChallenge: {}
    };
  }

  callback = key => {
    console.log(key);
  };

  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Add Challenges" key="1">
          <AdminAddChallenge />
        </TabPane>
        <TabPane tab="Challenge Editor" key="2">
          <AdminChallengeEditor />
        </TabPane>
        <TabPane tab="Challenge Submissions" key="3">
          <AdminChallengeSubmission />
        </TabPane>
      </Tabs>
    );
  }
}
