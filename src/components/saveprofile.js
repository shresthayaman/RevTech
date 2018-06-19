import { Component } from "react";

ComponentDidMount() {
    fire.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState(
            { user, loggedin: true },
            localStorage.setItem("user", user.uid)
          );
        } else {
          this.setState({ user: null }, localStorage.removeItem("user"));
        }
      });
      if (fire.auth().currentUser != null) {
        // console.log("Logged in:" + fire.auth().currentUser.email);
        this.setState({
          id: fire.auth().currentUser.email
        });
      }
}