import React from "react";
import ReactDOM from "react-dom";
import { Value } from "slate";
import { Button, Input, message } from "antd";
import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import { TimePicker } from "antd";
import "react-quill/dist/quill.snow.css";
import "./EditorDisplay.css";
import fire from "./fire";

/* 
 * Simple editor component that takes placeholder text as a prop 
 */
export default class EditorDisplay extends React.Component {
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

  handleSubmit = () => {
    fire
      .database()
      .ref(`DailyChallenges/${this.state.key}`)
      .update({
        title: this.state.title,
        text: this.state.text,
        date: this.state.firebaseDate,
        time: this.state.firebaseTime,
        submisison: []
      });

    message.success("Challenge Updated", 1);
  };

  render() {
    return (
      <div className="editor">
        <div className="challengeTitle">
          <Input
            placeholder="Challenge Title"
            onChange={e => this.changeTitle(e.target.value)}
            value={this.state.title}
          />
        </div>
        <ReactQuill
          className="textEditor"
          onChange={this.handleTextChange}
          value={this.state.text}
          modules={EditorDisplay.modules}
          formats={EditorDisplay.formats}
          bounds={".app"}
          placeholder="Pick a Challenge to Edit it's Contents"
        />
        <br />
        <div className="dueDateTime">
          <DatePicker
            value={this.state.date}
            onChange={this.changeDate}
            placeholder="Select Due Date"
          />
          <TimePicker
            value={this.state.time}
            use12Hours
            format="h:mm a"
            onChange={this.changeTime}
            placeholder="Select Time"
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
          Update Challenge
        </Button>
        <br />
      </div>
    );
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
EditorDisplay.modules = {
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
EditorDisplay.formats = [
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

/* 
 * PropType validation
 */
EditorDisplay.propTypes = {
  placeholder: PropTypes.string
};
