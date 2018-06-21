import React from "react";
import { Card, Input, Button } from "antd";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill";
import fire from "./fire";
import "./ChallengeDisplay.css";

export default class ChallengeDisplay extends React.Component {
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
    if (nextProps.clickedChallenge.submission !== undefined) {
      nextProps.clickedChallenge.submission.map(submission => {
        if (fire.auth().currentUser.email === submission.email) {
          link = submission.link;
          updatedState = {
            previousLink: link,
            alreadySubmitted: true
          };
        }
      });
    }
    this.setState(updatedState); //has to be here to make sure it reset the previousLink state when a new challenge is clicked
  }

  handleLinkSubmit = () => {
    const subRef = fire
      .database()
      .ref(`DailyChallenges/${this.props.clickedChallenge.key}/submission`);

    subRef.on("value", snapshot => {
      let allSubmissions = snapshot.val();

      let tempList = [];
      //map through all old submisssions and adds it to the copy array if it was not a submission from the user loged in
      if (allSubmissions !== null) {
        //to prevent mapping through undefined
        allSubmissions.map(submission => {
          if (submission.email !== fire.auth().currentUser.email) {
            tempList.push({
              email: submission.email,
              link: submission.link,
              onTime: submission.onTime
            });
          }
        });
      }

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

    this.setState({
      alreadySubmitted: true
    });
  };

  render() {
    console.log(this.props.clickedChallenge.text);
    return (
      <div>
        <h1 className="challengeTitle">{this.props.clickedChallenge.title}</h1>

        <ReactQuill
          theme="snow"
          value={this.props.clickedChallenge.text}
          modules={ChallengeDisplay.modules}
          formats={ChallengeDisplay.formats}
          bounds={".app"}
          placeholder="Pick a Challenge to Edit it's Contents"
          readOnly={true}
          toolbar={false}
        />
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

ChallengeDisplay.modules = {
  toolbar: false,
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
ChallengeDisplay.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];
