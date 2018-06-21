import React, { Component } from "react";
import "./LoginSignUpForm.css";
import { Redirect } from "react-router-dom";
import { Button, Input, Icon } from "antd";
import fire from "./fire";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      admin: [],
      user: null
    };
  }

  updateInfo = (field, e) => {
    this.setState({
      [field]: e
    });
  };

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
    fire
      .database()
      .ref("Users")
      .on("value", snapshot => {
        let allUsers = snapshot.val();
        let allAdmin = [];
        for (let user in allUsers) {
          if (allUsers[user].status === "admin") {
            allAdmin.push(allUsers[user].email);
          }
        }
        this.setState({
          admin: allAdmin
        });
      });
  }

  verifyLogin = () => {
    if (this.state.email !== "" && this.state.password) {
      fire
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(function(error) {
          let errorCode = error.code;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else if (errorCode === "auth/invalid-credential") {
            alert("Credentials expired.");
          } else if (errorCode === "auth/operation-not-allowed") {
            alert("Invalid type of account.");
          } else if (errorCode === "auth/user-disabled") {
            alert("Your account has been disabled.");
          } else {
            alert("User not found. Check username or click Sign Up");
          }
        });
      this.setState({
        email: "",
        password: ""
      });
    }
  };

  render() {
    if (this.state.user && this.state.admin.length !== 0) {
      let isAdmin = false;
      for (let i = 0; i < this.state.admin.length; i++) {
        if (this.state.admin[i] === fire.auth().currentUser.email) {
          isAdmin = true;
        }
      }
      if (isAdmin) {
        return <Redirect to="/Admin" />;
      } else {
        return <Redirect to="/User" />;
      }
    }
    return (
      <div className="login-container" >
        <div className="input-fields">
          <Input
            placeholder="Email"
            onChange={e => this.updateInfo("email", e.target.value)}
            value={this.state.email}
            onPressEnter={this.verifyLogin}
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </div>
        <div className="input-fields">
          <Input
            placeholder="Password"
            type="password"
            onChange={e => this.updateInfo("password", e.target.value)}
            value={this.state.password}
            onPressEnter={this.verifyLogin}
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </div>
        <br />

        <div className="button-container">
          <Button
            onClick={this.verifyLogin}
            disabled={this.state.email === "" || this.state.password === ""}
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}
export default LoginForm;
