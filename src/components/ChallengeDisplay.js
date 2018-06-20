import React from "react";
import { Card, Input, Button } from "antd";
import fire from "./fire";
import "./ChallengeDisplay.css";

export default class ChallenegeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousLink: "",
      alreadySubmitted: false
    };
  }

  componentWillReceiveProps(nextProps) {
    let link = "";
    let updatedState = {
      previousLink: "",
      alreadySubmitted: false
    };
    if (this.props.clickedChallenge !== nextProps.clickedChallenge) {
      nextProps.clickedChallenge.submission.map(submission => {
        if (fire.auth().currentUser.email === submission.email) {
          link = submission.link;
          updatedState = {
            previousLink: link,
            alreadySubmitted: true
          };
        }
      });
      this.setState(updatedState);
    }
  }

  handleLinkSubmit = () => {
    const subRef = fire
      .database()
      .ref(`DailyChallenges/${this.props.clickedChallenge.key}/submission`);
    subRef.on("value", snapshot => {
      let allSubmissions = snapshot.val();
      let tempList = [];
      //map through all old submisssions and adds it to the copy array if it was not a submission from the user loged in
      allSubmissions.map(submission => {
        if (submission.email !== fire.auth().currentUser.email) {
          tempList.push({
            email: submission.email,
            link: submission.link,
            onTime: submission.onTime
          });
        }
      });
      //will add the updated link or the new link (doesnt matter eith as their previoius input is not in the tempList)
      tempList.push({
        email: fire.auth().currentUser.email,
        link: this.state.previousLink,
        onTime: true
      });

      fire
        .database()
        .ref(`DailyChallenges/${this.props.clickedChallenge.key}`)
        .update({ submission: tempList });
    });
  };

  render() {
    return (
      <div>
        <h1>{this.props.clickedChallenge.title}</h1>
        <Card className="card">{this.props.clickedChallenge.detail}</Card>

        <div className="linkSubmission">
          <Input
            placeholder="Input link to submit"
            size="default"
            id="link"
            value={this.state.previousLink}
            onChange={event =>
              this.setState({ previousLink: event.target.value })
            }
          />
          <Button
            type={this.state.alreadySubmitted === false ? "primary" : "danger"}
            icon="download"
            size="default"
            onClick={() => this.handleLinkSubmit()}
          >
            {this.state.alreadySubmitted === false ? "Submit" : "Re-Submit"}
          </Button>
        </div>
      </div>
    );
  }
}
