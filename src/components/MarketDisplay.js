import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Modal, Input } from "antd";
import "./Marketplace.css";
import fire from "./fire.js";
import "antd/dist/antd.css";
import { relative } from "path";

class MarketDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visibleView: false,
      confirmLoading: false,
      hours: "",
      rate: "",
      notes: "",
      user: "",
      bids: [],
      bidButton: "Bid"
    };
  }
  updateText = (field, value) => {
    this.setState({
      [field]: value
    });
  };
  //What happens when Bid is clicked, check to see if they already bid
  handleClickBid = () => {
    this.setState({
      visible: true
    });
    let contractId = this.props.contract.id;
    const bidsRef = fire.database().ref(`/Contracts/${contractId}/bids`);
    let curBids = [];
    bidsRef.on("value", snapshot => {
      let bids = snapshot.val();
      for (let bid in bids) {
        curBids.push({
          bidder: bids[bid].bidder
        });
      }
    });
    for (let bid in curBids) {
      if (bid.bidder === this.props.id) {
        this.setState({
          bidButton: "Update Bid"
        });
      }
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      hours: "",
      rate: "",
      notes: ""
    });
  };
  //Will use if there is more information to display
  handleClickView = () => {
    this.setState({
      visibleView: true
    });
  };
  handleCancelView = e => {
    console.log(e);
    this.setState({
      visibleView: false
    });
  };
  submitBid = () => {
    const bid = {
      hours: this.state.hours,
      rate: this.state.rate,
      notes: this.state.notes,
      bidder: this.props.id
    };
    this.setState({
      confirmLoading: true
    });
    //make the window load a little bit to make people feel better
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 1000);
    if (this.state.hours && this.state.rate) {
      //Make shallow copy
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
      //Append new bid to shallow copy
      curBids.push(bid);
      fire
        .database()
        .ref(`/Contracts/${contractId}`)
        .update({ bids: curBids });
      //clear state
      this.setState({
        hours: "",
        rate: "",
        notes: ""
      });
    } else {
      //just in case
      alert("Please complete the bid form.");
    }
  };
  render() {
    const { contract, id } = this.props;
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Card
          style={{
            margin: "1.8vw",
            width: "21vw",
            padding: "1.8vw",
            height: "35vh",
            position: "relative"
          }}
        >
          <div className="Card-content">
            <h1 className="Title">{contract.company}</h1>
            <div className="Details">
              <p>
                <strong>Contract details: </strong>
                {contract.detail}
              </p>
            </div>
            <p>
              <strong>Contact info: </strong>
              {contract.contact}
            </p>
          </div>
          <div className="Con-buttons">
            <div>
              <Button onClick={this.handleClickView}>View</Button>
              &emsp;
            </div>
            <div>
              <Button type="primary" onClick={this.handleClickBid}>
                Bid
              </Button>
            </div>
          </div>
        </Card>
        <Modal
          title="Bidding Form"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={this.submitBid}
              disabled={
                this.state.hours === "" ||
                this.state.rate === "" ||
                this.state.hours <= 0 ||
                this.state.rate <= 0
              }
            >
              {this.state.bidButton}
            </Button>
          ]}
        >
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
              addonBefore="$"
              value={this.state.rate}
              onChange={e => this.updateText("rate", e.target.value)}
            />
            <div />
            <Input
              onChange={e => this.updateText("notes", e.target.value)}
              style={{ margin: "0.75vh" }}
              placeholder="Optional notes"
              value={this.state.notes}
            />
            <div />
          </form>
        </Modal>
        <div>
          <Modal
            title={contract.company}
            visible={this.state.visibleView}
            onOk={this.handleOkView}
            onCancel={this.handleCancelView}
            footer={[
              <Button key="cancel" onClick={this.handleCancelView}>
                Close
              </Button>
            ]}
          >
            <p>
              <strong>Contract details:</strong>
              {contract.detail}
            </p>
            <p>
              <strong>Contact info:</strong>
              {contract.contact}
            </p>
          </Modal>
        </div>
      </div>
    );
  }
}

export default MarketDisplay;
