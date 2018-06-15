import React, { Component } from 'react';
import { Button, Input, Select } from 'antd';
import './LoginSignUpForm.css'
import fire from './fire'

const Option = Select.Option;

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            status: "",
            gradYear: ""
        }
    }

    updateInfo = (field, e) => {
        this.setState({
            [field]: e
        });
    }

    submitApplication = () => {
        fire.database().ref('Users').on('value', (snapshot) => {
            let emailAlreadyExists = false;
            let allUsers = snapshot.val();
            for (let user in allUsers) {
                if (allUsers[user].email === this.state.email) {
                    emailAlreadyExists = true;
                }
            }
            if (this.state.name && this.state.email && this.state.status && this.state.gradYear && !emailAlreadyExists) {
                let application = {
                    name: this.state.name,
                    linkedin: "",
                    status: this.state.status,
                    email: this.state.email,
                    gradYear: this.state.gradYear,
                    github: "",
                    approve: false,
                    pictureURL: ""
                }
                fire.database().ref('Users').push(application);
            }
            else {
                if (emailAlreadyExists) {
                    alert("This email is already in use!");
                }
                else {
                    alert("did not fill in all the fields");
                }
            }
        })
        this.setState({
            name: null,
            email: null,
            status: null,
            gradYear: null
        });
    }

    render() {
        return (
            <div className="login-container">
                <div className="input-fields">
                    <Input
                        placeholder="Name"
                        onChange={(e) => this.updateInfo("name", e.target.value)}
                        value={this.state.name}
                    />
                </div>
                <div className="input-fields">
                    <Input
                        placeholder="Email"
                        onChange={(e) => this.updateInfo("email", e.target.value)}
                        value={this.state.email}
                    />
                </div>
                <div className="input-fields" id="status-grad-year">
                    <Select
                        id="status"
                        placeholder="Status"
                        onChange={(e) => this.updateInfo("status", e)}
                        style={{ width: 200 }}
                    >
                        <Option value="intern">Intern</Option>
                        <Option value="alum">Alumi</Option>
                        <Option value="admin">Administrator</Option>
                    </Select>
                    <Input
                        id="grad-year"
                        placeholder="Graduation Year (Ex: 2020)"
                        onChange={(e) => this.updateInfo("gradYear", e.target.value)}
                        value={this.state.gradYear}
                    />
                </div>
                <div className="button-container">
                    <Button
                        onClick={this.submitApplication}
                        disabled={this.state.name === "" || this.state.email === "" || this.state.status === "" || this.state.gradYear === ""}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        );
    }
}

export default SignUpForm;