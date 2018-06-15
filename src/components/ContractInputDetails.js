import React, { Component } from "react";
import { Button, Input } from 'antd';
import './LoginSignUpForm.css'
import 'antd/dist/antd.css';
import fire from './fire'

const style = {
  marginRight: 20
};

const { TextArea } = Input;

export default class InputDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      details: "",
      email: "",
      companyPhone: ""
    };
  }

  updateInfo = (field, e) => {
    this.setState({
      [field]: e
    });
  }

  handleClick = () => {
    if (this.state.company === "" || this.state.companyPhone === "" || this.state.details === "" || this.state.email === "") {
      alert("Some field are missing! Please resubmit after filling out all fields.");
    }
    else {
      let editPhoneNumber = "";
      for (let i = 0; i < this.state.companyPhone.length; i++) {
        if (!isNaN(this.state.companyPhone.charAt(i))) {
          editPhoneNumber = editPhoneNumber + this.state.companyPhone.charAt(i);
        }
      }
      let contract = {
        approve: true,
        company: this.state.company,
        contact: this.state.email,
        detail: this.state.details,
        phoneNumber: editPhoneNumber
      }
      fire.database().ref('Contracts').push(contract);
    }

    //reset the input boxes
    this.setState({
      company: "",
      details: "",
      email: "",
      companyPhone: ""
    })
  }

  render() {
    return (
      <div className="login-container">
        <div className="input-fields">
          <Input
            id="company"
            placeholder="Company Name"
            onChange={(e) => this.updateInfo("company", e.target.value)}
            value={this.state.company}
            onPressEnter={this.handleClick}
          />
        </div>
        <div className="input-fields">
          <Input
            id="email"
            placeholder="Company Email"
            onChange={(e) => this.updateInfo("email", e.target.value)}
            value={this.state.email}
            onPressEnter={this.handleClick}
          />
        </div>
        <div className="input-fields">
          <Input
            id="phoneNumber"
            placeholder="Contact Number"
            onChange={(e) => this.updateInfo("companyPhone", e.target.value)}
            value={this.state.companyPhone}
            onPressEnter={this.handleClick}
          />
        </div>
        <div className="input-fields">
          <TextArea
            rows={3}
            id="details"
            placeholder="Contract Details"
            onChange={(e) => this.updateInfo("details", e.target.value)}
            value={this.state.details}
            onPressEnter={this.handleClick}
          />
        </div>
        <div className="button-container">
          <Button
            variant="raised"
            color="primary"
            onClick={this.handleClick}
            disabled={this.state.company === "" || this.state.companyPhone === "" || this.state.details === "" || this.state.email === ""}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}
