import React from "react";
import ReactDOM from "react-dom";
import { Value } from "slate";
import { Button, Input } from "antd";
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
      firebaseTime: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.clickedChallenge !== nextProps.clickedChallenge) {
      this.setState({
        title: nextProps.clickedChallenge.title,
        text: nextProps.clickedChallenge.text,
        firebaseDate: nextProps.clickedChallenge.date,
        firebaseTime: nextProps.clickedChallenge.time
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
    // const subRef = fire.database().ref(`DailyChallenges/${this.props.clickedChallenege.key}`);
    // subRef.on("value", snapshot => {
    //   let allChallenges = snapshot.val();
    //   let tempList = [];
    //   for (let challenge in allChallenges) {
    //     if (challenge.key !== this.state.key) {
    //       tempList.push({
    //         key: challenge.key,
    //         title: challenge.title,
    //         text: challenge.text,
    //         date: challenge.date,
    //         time: challenge.time,
    //         submisisons: challenge.submissions
    //       });
    //     }
    //   }
    //   tempList.push({
    //     key: this.state.key,
    //     title: this.state.title,
    //     text: this.state.text,
    //     date: this.state.date,
    //     time: this.state.time,
    //     submisisons: this.state.submissions
    //   });
    //   console.log(tempList);
    //   fire
    //     .database()
    //     .ref("/")
    //     .update({ DailyChallenges: tempList });
    // });
  };

  render() {
    console.log(this.state);
    return (
      <div className="editorButton">
        <Input
          onChange={e => this.changeTitle(e.target.value)}
          value={this.state.title}
        />
        <ReactQuill
          className="textEditor"
          theme={this.state.theme}
          onChange={this.handleTextChange}
          value={this.state.text}
          modules={EditorDisplay.modules}
          formats={EditorDisplay.formats}
          bounds={".app"}
          placeholder={this.props.placeholder}
        />
        <DatePicker value={this.state.date} onChange={this.changeDate} />
        <TimePicker
          value={this.state.time}
          use12Hours
          format="h:mm a"
          onChange={this.changeTime}
        />
        <Button className="button" type="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
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
