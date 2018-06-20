import React from "react";
import { List, Button, Input } from "antd";
import "./SubmissionDisplay.css";

export default class SubmissionDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      text: "",
      date: null, //date is to keep the proper dispaly on user screen
      time: null,
      firebaseDate: null, //firebaseDate is o have a string format to push to firebase
      firebaseTime: null,
      submission: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.clickedChallenge !== nextProps.clickedChallenge) {
      this.setState({
        key: nextProps.clickedChallenge.key,
        title: nextProps.clickedChallenge.title,
        text: nextProps.clickedChallenge.text,
        firebaseDate: nextProps.clickedChallenge.date,
        firebaseTime: nextProps.clickedChallenge.time,
        submission: nextProps.clickedChallenge.submission
      });
    }
  }

  render() {
    return (
      <div>
        <List
          className="submissionList"
          bordered
          header={
            <div className="listItem">
              <div>
                <u>User</u>
              </div>
              <div>
                <u>Submitted Link</u>
              </div>
            </div>
          }
          itemLayout="vertical"
          dataSource={this.state.submission}
          renderItem={item => (
            <List.Item key={item}>
              <div className="listItem">
                <p>{item.email}</p> <a href={item.link}> {item.link}</a>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
