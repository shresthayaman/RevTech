import React, { Component } from 'react';
import { Button, Input, Select } from 'antd';
import './LoginSignUpForm.css'
import fire from './fire'

const Option = Select.Option;

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            status: null,
            gradYear: null
        }
    }

    updateInfo = (field, e) => {
        this.setState({
            [field]: e
        });
    }

    submitApplication = () => {
        if (this.state.name && this.state.email && this.state.status && this.state.gradYear) {
            let application = {
                name: this.state.name,
                linkedin: "",
                status: this.state.status,
                email: this.state.email,
                gradYear: this.state.gradYear,
                github: "",
                approve: false
            }
            fire.database().ref('Users').push(application);
        }
        else {
            alert("did not fill in all the fields");
        }
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
                    <Button onClick={this.submitApplication}>
                        Apply
                    </Button>
                </div>
            </div>
        );
    }
}

export default SignUpForm;