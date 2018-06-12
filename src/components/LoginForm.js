import React, { Component } from 'react';
import './LoginForm.css'
import { Button } from 'antd';
import { Input } from 'antd';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        }
    }

    updateInfo = (field, e) => {
        this.setState({
            [field]: e
        });
    }

    render() {
        return (
            <div className="login-container">
                <div className="input-fields">
                    <Input
                        placeholder="Email"
                        onChange={(e) => this.updateInfo("email", e.target.value)}
                        value={this.state.email}
                    />
                </div>
                <div className="input-fields">
                    <Input
                        placeholder="Password"
                        type="password" onChange={(e) => this.updateInfo("password", e.target.value)}
                        value={this.state.password}
                    />
                </div>
                <div className="button-container">
                    <Button>
                        login
                    </Button>
                </div>
            </div>
        );
    }
}

export default LoginForm;