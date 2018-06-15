import React from "react";
import ReactDOM from "react-dom";
import { Value } from "slate";
import { Button } from "antd";
import CannerEditor from "canner-slate-editor";
import "./AdminChallengeEditor.css";

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "A line of text in a paragraph."
              }
            ]
          }
        ]
      }
    ]
  }
});

export default class AdminChallengeEditor extends React.Component {
  // Set the initial state when the app is first constructed.
  constructor(props) {
    super(props);
    this.state = {
      value: initialValue
    };
  }

  handleClick = () => {
    const content = JSON.stringify(this.state.value.toJSON());
    console.log(content);
  };

  render() {
    const { value } = this.state;
    const onChange = ({ value }) => this.setState({ value });

    return (
      <div className="editorButton">
        <CannerEditor
          className="textEditor"
          value={value}
          onChange={onChange}
        />
        <Button
          className="button"
          type="primary"
          onClick={() => this.handleClick()}
        >
          Submit
        </Button>
      </div>
    );
  }
}
