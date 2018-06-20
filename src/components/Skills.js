import React, { Component } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import fire from "./fire";

export default class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      software: true,
      data: false,
      media: true
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  //   handleSubmit = e => {
  //     const usersRef = fire.database().ref("Users");
  //     usersRef.on("value", snapshot => {
  //       let users = snapshot.val();
  //       let newState = [];
  //       for (let user in users) {
  //         if (users[user].email === this.props.userEmail) {
  //           console.log(user);
  //           usersRef.push({
  //             skills: [this.state]
  //           });
  //           console.log(user);
  //         }
  //       }
  //     });
  //   };

  render() {
    console.log(this.state);
    return (
      <div>
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose your Skillset(s)</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.software}
                  onChange={this.handleChange("software")}
                  value="software"
                />
              }
              label="Software Engineering"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.data}
                  onChange={this.handleChange("data")}
                  value="data"
                />
              }
              label="Data Science"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.media}
                  onChange={this.handleChange("media")}
                  value="media"
                />
              }
              label="Digital Media"
            />
          </FormGroup>
        </FormControl>
        <Button onClick={this.handleSubmit}> Submit </Button>
      </div>
    );
  }
}
