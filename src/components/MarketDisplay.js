import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Modal } from "antd";
import "./Marketplace.css";
import BidForm from "./BidForm.js";
import fire from "./fire.js";
import "antd/dist/antd.css";

class MarketDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false
    };
  }
  handleClickBid = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };
  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleClickView = () => {};
  render() {
    const { contract, id } = this.props;
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Card style={{ margin: "1vw", width: "18vw", padding: "1vw" }}>
          <h1>{contract.company}</h1>
          <p>
            <strong>Contract details: </strong>
            {contract.detail}
          </p>
          <p>
            <strong>Contact info: </strong>
            {contract.contact}
          </p>
          <div className="Con-buttons">
            <div className="Con-button">
              <Button style={{}} onClick={this.handleClickView}>
                View
              </Button>
              &emsp;
            </div>
            <div className="Con-button">
              <Button
                style={{ float: "right" }}
                type="primary"
                onClick={this.handleClickBid}
              >
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
        >
          <BidForm
            id={this.props.id}
            contract={this.props.contract}
            conId={this.props.contract.id}
          />
        </Modal>
      </div>
    );
  }
}

export default MarketDisplay;
