import React, { Component } from 'react';
import './LoginSignUpForm.css'
import { Redirect } from 'react-router-dom';
import { Button, Input, Icon } from 'antd';
import fire from './fire';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            admin: false,
            user: null
        }
    }

    updateInfo = (field, e) => {
        this.setState({
            [field]: e
        });
    }

    clearInfo = (field) => {
        this.setState({
            [field]: ""
        });
    }

    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ user });
                localStorage.setItem("user", user.uid);
            } else {
                this.setState({ user: null });
                localStorage.removeItem("user");
            }
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
        fire.database().ref('Users').on('value', (snapshot) => {
            let allUsers = snapshot.val();
            for (let user in allUsers) {
                if (allUsers[user].status === "admin" && this.state.email === allUsers[user].email) {
                    this.setState({
                        admin: true
                    })
                }
            }
        })
        this.setState({
            email: "",
            password: ""
        });
    }

    render() {
        if (this.state.user) {
            if (this.state.admin) {
                return <Redirect to="/AdminPage" />
            }
            else {
                return <Redirect to="/DummyPage" />
            }
        }
        return (
            <div className="login-container">
                <div className="input-fields">
                    <Input
                        placeholder="Email"
                        onChange={(e) => this.updateInfo("email", e.target.value)}
                        value={this.state.email}
                        onPressEnter={this.verifyLogin}
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="input-fields">
                    <Input
                        placeholder="Password"
                        type="password" onChange={(e) => this.updateInfo("password", e.target.value)}
                        value={this.state.password}
                        onPressEnter={this.verifyLogin}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    />
                </div>
                <div className="button-container">
                    <Button
                        onClick={this.verifyLogin}
                        disabled={this.state.email === "" || this.state.password === ""}>
                        login
                    </Button>
                </div>
            </div>
        );
    }
}

export default LoginForm;