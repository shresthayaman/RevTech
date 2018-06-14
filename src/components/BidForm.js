import React, { Component } from "react";
import { Input, Button } from "antd";
import fire from "./fire.js";
import "antd/dist/antd.css";

class BidForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: null,
      rate: null,
      notes: "",
      user: "",
      bids: []
    };
  }
  updateText = (field, value) => {
    this.setState({
      [field]: value
    });
  };
  submitBid = () => {
    const bid = {
      hours: this.state.hours,
      rate: this.state.rate,
      notes: this.state.notes,
      bidder: this.props.id
    };
    if (this.state.hours !== 0 && this.state.rate !== 0) {
      //something
      let contractId = this.props.contract.id;
      let newBids = [];
      let shallowCopy = [];
      const bidsRef = fire.database().ref("Contracts");
      bidsRef.on("value", snapshot => {
        for (let contract in snapshot.val()) {
          if (contract === contractId) {
            shallowCopy = snapshot.val()[contract].bids;
          }
        }
        shallowCopy.push(bid);
        bidsRef.set("/Contract/${contractId}").set({
          bids: shallowCopy
        });
        // let bids = [];
        // console.log(snapshot.val());
        // for (let bid in bids) {
        //   newBids.push(bid);
        // }
        // console.log(newBids);
        // this.setState({
        //   bids: bids
        // });
      });
      bidsRef.set(newBids);
    } else {
      alert("Please complete the bid form.");
    }
  };
  render() {
    return (
      <form>
        <Input
          type="number"
          style={{ margin: "0.75vh", width: "10vw" }}
          placeholder="Hours required"
          value={this.state.hours}
          onChange={e => this.updateText("hours", e.target.value)}
        />
        <div />
        <Input
          type="number"
          style={{ margin: "0.75vh", width: "10vw" }}
          placeholder="Rate per hour"
          value={this.state.rate}
          onChange={e => this.updateText("rate", e.target.value)}
        />
        <div />
        <Input
          onChange={e => this.updateText("notes", e.target.value)}
          style={{ margin: "0.75vh" }}
          placeholder="Additional notes"
          value={this.state.notes}
        />
        <div />
        <Button onClick={this.submitBid}>Test</Button>
      </form>
    );
  }
}

export default BidForm;
