import React from "react";
import "antd/dist/antd.css";
import { List, Button, Modal } from "antd";
import fire from "./fire";
import EditorDisplay from "./EditorDisplay";

export default class AdminChallengeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challengeArray: [],
      clickedChallenge: {},
      tryToRemove: {},
      ModalText: "",
      visible: false,
      confirmLoading: false
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
          text: allChallenges[challenge].text,
          date: allChallenges[challenge].date,
          time: allChallenges[challenge].time,
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

  handleRemove = item => {
    let text = "Do you want to remove: " + item.title + "?";
    this.setState({
      visible: true,
      ModalText: text,
      tryToRemove: item
    });
    console.log("I am trying to remove");
  };

  //only after user clicks ok confirmation when attempting to remove it will remove from database
  handleOk = item => {
    console.log(this.state.tryToRemove.key);
    const challengeRef = fire
      .database()
      .ref(`/DailyChallenges/${this.state.tryToRemove.key}`);
    challengeRef.remove();

    this.setState({
      ModalText: "Removing Daily Challenge...",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 500);
  };
  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  render() {
    //console.log(this.state.clickedChallenge);
    return (
      <div className="DisplayListSubmissions">
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {this.state.clickedChallenge.title}
        </h1>
        <EditorDisplay clickedChallenge={this.state.clickedChallenge} />;
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
            <List.Item
              key={item.title}
              extra={[
                <Button
                  type="danger"
                  size="small"
                  onClick={() => this.handleRemove(item)}
                >
                  X
                </Button>
              ]}
            >
              <Modal
                visible={this.state.visible}
                onOk={() => this.handleOk(item)}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
              >
                <p>{this.state.ModalText}</p>
              </Modal>
              <div className="listItem">
                <a onClick={() => this.handleClick(item)}>{item.title}</a>
                <div>
                  {item.date}
                  <br />
                  {item.time}
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
