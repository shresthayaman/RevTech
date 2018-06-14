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
      const bidsRef = fire.database().ref(`/Contracts/${contractId}/bids`);
      let curBids = [];
      bidsRef.on("value", snapshot => {
        let bids = snapshot.val();
        for (let bid in bids) {
          curBids.push({
            hours: bids[bid].hours,
            rate: bids[bid].rate,
            notes: bids[bid].notes,
            bidder: bids[bid].bidder
          });
        }
      });
      curBids.push(bid);
      fire
        .database()
        .ref(`/Contracts/${contractId}`)
        .update({ bids: curBids });
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
