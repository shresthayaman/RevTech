import React from "react";
import "antd/dist/antd.css";
import fire from "./fire";
import { Button, Input, message } from "antd";
import ReactQuill from "react-quill";
import { DatePicker } from "antd";
import { TimePicker } from "antd";
import "react-quill/dist/quill.snow.css";
import "./EditorDisplay.css";

export default class AdminAddChallenge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      date: null, //date is to keep the proper dispaly on user screen
      time: null,
      firebaseDate: null, //firebaseDate is o have a string format to push to firebase
      firebaseTime: null
    };
  }

  handleTextChange = html => {
    this.setState({ text: html });
  };

  changeTitle = title => {
    this.setState({ title: title });
  };

  changeDate = value => {
    this.setState({
      date: value,
      firebaseDate: value.format("L")
    });
  };

  changeTime = value => {
    this.setState({
      time: value,
      firebaseTime: value.format("LT")
    });
  };

  // add daily challeneges to the the database
  handleSubmit = () => {
    console.log("I am clicked");
    let challengeRef = fire.database().ref("DailyChallenges");
    let challengeToAdd = {
      title: this.state.title,
      text: this.state.text,
      date: this.state.firebaseDate,
      time: this.state.firebaseTime,
      submisison: []
    };

    challengeRef.push(challengeToAdd);
    message.success("Challenge Published", 1);

    this.setState({
      title: "",
      text: "",
      date: null,
      time: null,
      firebaseDate: null,
      firebaseTime: null
    });
  };

  render() {
    return (
      <div className="editor">
        <div className="challengeTitle">
          <Input
            placeholder="New Challenge Title"
            onChange={e => this.changeTitle(e.target.value)}
            value={this.state.title}
          />
        </div>
        <ReactQuill
          className="textEditor"
          theme={this.state.theme}
          onChange={this.handleTextChange}
          value={this.state.text}
          modules={AdminAddChallenge.modules}
          formats={AdminAddChallenge.formats}
          bounds={".app"}
          placeholder="Input description of new challenge"
        />
        <br />
        <div className="dueDateTime">
          <DatePicker value={this.state.date} onChange={this.changeDate} />
          <TimePicker
            value={this.state.time}
            use12Hours
            format="h:mm a"
            onChange={this.changeTime}
          />
        </div>
        <br />
        <Button
          className="button"
          type="primary"
          onClick={this.handleSubmit}
          disabled={
            this.state.title === "" ||
            this.state.text === "" ||
            this.state.date === null ||
            this.state.time === null
          }
        >
          Publish Challenge
        </Button>
      </div>
    );
  }
}

AdminAddChallenge.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
/* 
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
AdminAddChallenge.formats = [
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
