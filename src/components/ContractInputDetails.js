import React from "react";

import TextField from "@material-ui/core/TextField";

import "antd/dist/antd.css";
import { Button } from "antd";

const style = {
  marginRight: 20
};

const styles = {
  errorStyle: {},
  underlineStyle: {},
  floatingLabelStyle: {},
  floatingLabelFocusStyle: {}
};

export default class InputDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      details: "",
      email: "",
      companyPhone: ""
    };
  }

  handleClick() {
    if (
      document.getElementById("company").value === "" ||
      document.getElementById("details").value === "" ||
      document.getElementById("email").value === "" ||
      document.getElementById("phoneNumber").value === ""
    ) {
      alert(
        "Some field are missing! Please resubmit after filling out all fields."
      );
    } else {
      this.setState(
        {
          //update state with value in corresponding inputed in input boxes
          company: document.getElementById("company").value,
          details: document.getElementById("details").value,
          email: document.getElementById("email").value,
          companyPhone: document.getElementById("phoneNumber").value
        },
        () => {
          this.props.addContract(this.state); //update the contract List in the state of the main class
        }
      );
    }

    //reset the input boxes
    document.getElementById("company").value = "";
    document.getElementById("details").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
  }

  render() {
    return (
      <div>
        <TextField
          id="company"
          floatingLabelText="Company Name"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <br />
        <TextField
          id="details"
          floatingLabelText="Contract Details"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <br />
        <TextField
          id="email"
          floatingLabelText="Company Email"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <br />
        <TextField
          id="phoneNumber"
          floatingLabelText="Contact Number"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
        />
        <br />

        <Button
          variant="raised"
          color="primary"
          onClick={event => this.handleClick()}
        >
          Submit
        </Button>
      </div>
    );
  }
}
