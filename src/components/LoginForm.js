import React, { Component } from 'react';
import './LoginForm.css'
import { Redirect } from 'react-router-dom';
import { Button } from 'antd';
import { Input } from 'antd';
import fire from './fire';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            user: null
        }
    }

    updateInfo = (field, e) => {
        this.setState({
            [field]: e
        });
    }

    verifyLogin = () => {
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(function (error) {
                let errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                }
                else if (errorCode === 'auth/invalid-credential') {
                    alert('Credentials expired.');
                }
                else if (errorCode === 'auth/operation-not-allowed') {
                    alert('Invalid type of account.');
                }
                else if (errorCode === 'auth/user-disabled') {
                    alert('Your account has been disabled.');
                }
                else {
                    alert('User not found. Check username or click Sign Up');
                }
            });
        this.setState({
            email: null,
            password: null,
            user: "here"
        })
    }

    render() {
        if (this.state.user) {
            return <Redirect to="/DummyPage" />
        }
        return (
            <div className="login-container">
                <div className="input-fields">
                    <Input
                        placeholder="Email"
                        onChange={(e) => this.updateInfo("email", e.target.value)}
                        value={this.state.email}
                        onPressEnter={this.verifyLogin}
                    />
                </div>
                <div className="input-fields">
                    <Input
                        placeholder="Password"
                        type="password" onChange={(e) => this.updateInfo("password", e.target.value)}
                        value={this.state.password}
                        onPressEnter={this.verifyLogin}
                    />
                </div>
                <div className="button-container">
                    <Button onClick={this.verifyLogin}>
                        login
                    </Button>
                </div>
            </div>
        );
    }
}

export default LoginForm;