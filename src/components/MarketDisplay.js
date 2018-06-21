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
      visibleDetails: false,
      confirmLoading: false,
      hours: "",
      rate: "",
      notes: "",
      user: "",
      bids: [],
      bidButton: "Bid",
      bidButtonColor: "#015249",
      didBid: false,
      previousBid: "No bid found",
      totalBids: 0
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
  handleClickDetails = () => {
    this.setState({
      visibleDetails: true
    });
  };
  handleCancelDetails = e => {
    this.setState({
      visibleDetails: false
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
    }, 500);
    if (this.state.hours && this.state.rate) {
      //Case for checking if the user has an existing bid for the contract
      if (this.state.didBid) {
        let contractId = this.props.contract.id;
        const bidsRef = fire.database().ref(`/Contracts/${contractId}/bids`);
        let curBids = [];
        bidsRef.once("value", snapshot => {
          let bids = snapshot.val();
          for (let bid in bids) {
            if (bids[bid].bidder !== this.props.id) {
              curBids.push({
                hours: bids[bid].hours,
                rate: bids[bid].rate,
                notes: bids[bid].notes,
                bidder: bids[bid].bidder
              });
            }
          }
        });
        //Append new bid to shallow copy
        curBids.push(bid);
        fire
          .database()
          .ref(`/Contracts/${contractId}`)
          .update({
            bids: curBids
          });
        let prevBidString =
          bid.hours +
          " hours at " +
          bid.rate +
          " dollars per hour; total cost: $" +
          bid.hours * bid.rate;
        this.setState({
          bidButton: "Update Bid",
          bidButtonColor: "#77D9C4",
          didBid: true,
          previousBid: prevBidString,
          totalBids: curBids.length
        });
      } else {
        //Make shallow copy
        let contractId = this.props.contract.id;
        const bidsRef = fire.database().ref(`/Contracts/${contractId}/bids`);
        let curBids = [];
        bidsRef.once("value", snapshot => {
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
          .update({
            bids: curBids
          });
        let prevBidString =
          bid.hours +
          " hours at " +
          bid.rate +
          " dollars per hour; total cost: $" +
          bid.hours * bid.rate;
        this.setState({
          bidButton: "Update Bid",
          bidButtonColor: "#77D9C4",
          didBid: true,
          previousBid: prevBidString,
          totalBids: curBids.length
        });
      }
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
  componentDidMount() {
    let contractId = this.props.contract.id;
    const bidsRef = fire.database().ref(`/Contracts/${contractId}/bids`);
    let curBids = [];
    bidsRef.on("value", snapshot => {
      let bids = snapshot.val();
      for (let bid in bids) {
        curBids.push({
          bidder: bids[bid].bidder,
          rate: bids[bid].rate,
          hours: bids[bid].hours
        });
      }
    });
    this.setState({ totalBids: curBids.length });
    for (let bid in curBids) {
      if (curBids[bid].bidder === this.props.id) {
        let prevBidString =
          curBids[bid].hours +
          " hours at " +
          curBids[bid].rate +
          " dollars per hour; total cost: $" +
          curBids[bid].rate * curBids[bid].hours;
        this.setState({
          bidButton: "Update Bid",
          bidButtonColor: "#77D9C4",
          didBid: true,
          previousBid: prevBidString,
          totalBids: curBids.length
        });
      }
    }
  }
  render() {
    const { contract, id } = this.props;
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Card
          elevation={12}
          square={false}
          style={{
            margin: "1.8vw",
            maxWidth: "20vw",
            minWidth: "250px",
            padding: "1.8vw",
            height: "300px",
            position: "relative"
          }}
        >
          <div className="Card-content">
            <p className="Title">{contract.company}</p>
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
              <Button onClick={this.handleClickDetails}>Details</Button>
              &emsp;
            </div>
            <div>
              <Button
                type="primary"
                style={{ background: this.state.bidButtonColor }}
                onClick={this.handleClickBid}
              >
                {this.state.bidButton}
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
            visible={this.state.visibleDetails}
            onOk={this.handleOkDetails}
            onCancel={this.handleCancelDetails}
            footer={[
              <Button key="cancel" onClick={this.handleCancelDetails}>
                Close
              </Button>
            ]}
          >
            <p>
              <strong>Contract details: </strong>
              {contract.detail}
            </p>
            <p>
              <strong>Contact info: </strong>
              {contract.contact}
            </p>
            <p>
              <strong>Your previous bid: </strong>
              {this.state.previousBid}
            </p>
            <p>
              <strong>Total bids: </strong>
              {this.state.totalBids}
            </p>
          </Modal>
        </div>
      </div>
    );
  }
}

export default MarketDisplay;
