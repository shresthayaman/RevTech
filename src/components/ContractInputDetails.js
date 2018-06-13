import React from "react";
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';

const style = {
  marginRight: 20
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

        <Input
          id="company"
          placeholder="Company Name"
        />
        <br />
        <Input
          id="details"
          placeholder="Contract Details"
        />
        <br />
        <Input
          id="email"
          placeholder="Company Email"
        />
        <br />
        <Input
          id="phoneNumber"
          placeholder="Contact Number"
        />
        <br />

        <Button
          variant="raised"
          color="primary"
          onClick={event => this.handleClick()}
        >Submit

        </Button>
      </div>
    );
  }
}