import React from "react";
import "antd/dist/antd.css";
import { List } from "antd";
import ChallengeDisplay from "./ChallengeDisplay";
import "./ChallengeList.css";
import fire from "./fire";

export default class ChallenegeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeArray: [],
      clickedChallenge: {
        title: "Daily Challeneges",
        detail:
          "Select a specific daily challenge to obtain challenege details,",
        dueDate: "N/A"
      }
    };
  }

  //get all the daily challenges from database to obtain the data
  componentDidMount() {
    const fireRef = fire.database().ref("DailyChallenges");
    fireRef.on("value", snapshot => {
      let allChallenges = snapshot.val();
      let tempList = [];
      for (let challenge in allChallenges) {
        tempList.push({
          key: challenge,
          title: allChallenges[challenge].title,
          detail: allChallenges[challenge].detail,
          dueDate: allChallenges[challenge].dueDate,
          submission: allChallenges[challenge].submission
        });
      }
      this.setState({
        challengeArray: tempList
      });
    });
  }

  //change the challenge stored in state when another challenge is selected
  handleClick = item => {
    this.setState({
      clickedChallenge: item
    });
  };

  render() {
    return (
      <div className="challengeDisplayAndList">
        <ChallengeDisplay clickedChallenge={this.state.clickedChallenge} />

        <List
          bordered
          header={
            <div className="listHeader">
              <div>Daily Challenege</div>
              <div>Due Date</div>
            </div>
          }
          itemLayout="vertical"
          size="default"
          pagination={{
            onChange: page => {},
            pageSize: 5
          }}
          dataSource={this.state.challengeArray}
          renderItem={item => (
            <List.Item key={item.title}>
              <div className="listItem">
                <a onClick={() => this.handleClick(item)}>{item.title}</a>
                {item.dueDate}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
