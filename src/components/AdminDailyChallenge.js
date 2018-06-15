import React from "react";
import "antd/dist/antd.css";
import { List, message } from "antd";
import fire from "./fire";
import AdminChallenegeEditor from "./AdminChallenegeEditor";

export default class AdminDailyChallenege extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeArray: [],
      clickedChallenge: {}
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

  handleClick = item => {
    this.setState({
      clickedChallenge: item
    });
  };

  render() {
    console.log(this.state.clickedChallenge);
    return (
      <div className="DisplayListSubmissions">
        <AdminChallenegeEditor />;
        <List
          bordered
          header={
            <div className="listHeader">
              <div>Daily Challeneges</div>
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
