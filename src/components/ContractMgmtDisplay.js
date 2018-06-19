import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Modal, Input, message, Checkbox } from "antd";
import "./ContractMgmt.css";
import fire from "./fire.js";
import "antd/dist/antd.css";
import { relative } from "path";

class ContractMgmtDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEdit: false,
      visibleDeny: false,
      visibleAward: false,
      user: "",
      details: "",
      contact: ""
    };
  }
  updateText = (field, value) => {
    this.setState({
      [field]: value
    });
  };
  //What happens when Bid is clicked, check to see if they already bid
  handleClickAward = () => {
    this.setState({
      visibleAward: true
    });
  };
  handleCancelEdit = () => {
    this.setState({
      visibleEdit: false
    });
  };
  //Will use if there is more information to display
  handleClickEdit = () => {
    this.setState({
      visibleEdit: true
    });
  };
  handleClickDeny = () => {
    this.setState({
      visibleDeny: true
    });
  };
  handleCancelEdit = e => {
    console.log(e);
    this.setState({
      visibleEdit: false
    });
  };
  handleCancelDeny = e => {
    console.log(e);
    this.setState({
      visibleDeny: false
    });
  };
  handleDeny = () => {
    let contractId = this.props.contract.id;
    const contractRef = fire.database().ref(`/Contracts/${contractId}`);
    contractRef.remove();
    message.error("Contract denied!");
  };
  submitEdits = () => {
    let contractId = this.props.contract.id;
    const contractRef = fire.database().ref(`/Contracts/${contractId}`);
    contractRef.update({
      detail: this.state.details,
      contact: this.state.contact
    });
    this.setState({
      visibleEdit: false
    });
    message.success("Changes submitted!");
  };
  handleCancelAward = () => {
    this.setState({
      visibleAward: false
    });
  };
  handleAward = () => {
    message.success("Contract Awarded!");
    this.setState({
      visibleAward: false
    });
  };
  componentDidMount() {
    this.setState({
      details: this.props.contract.detail,
      contact: this.props.contract.contact
    });
    if (this.props.contract.bids) {
      const bidCheckList = this.props.contract.bids.map(bid => {
        return <Checkbox> {bid.user} </Checkbox>;
      });
    } else {
      const bidCheckList = () => {
        return <p> No bids found. </p>;
      };
    }
  }
  render() {
    const { contract, id } = this.props;
    const { visible, confirmLoading } = this.state;
    const { TextArea } = Input;
    return (
      <div>
        <Card
          elevation={12}
          square={false}
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
              <Button onClick={this.handleClickEdit}>Edit</Button>
              &emsp;
            </div>
            <div>
              <Button
                type="primary"
                style={{ background: "#389e0d" }}
                onClick={this.handleClickAward}
              >
                Award
              </Button>
              &emsp;
            </div>
            <div>
              <Button type="danger" onClick={this.handleClickDeny}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
        <Modal
          title="Editing Form"
          visible={this.state.visibleEdit}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancelEdit}
          footer={[
            <Button key="cancel" onClick={this.handleCancelEdit}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={this.submitEdits}
              disabled={this.state.detail === "" || this.state.contact === ""}
            >
              Submit Changes
            </Button>
          ]}
        >
          <form>
            <TextArea
              rows={8}
              style={{ margin: "0.75vh", width: "34vw" }}
              placeholder="Contract details"
              defaultValue={contract.detail}
              onChange={e => this.updateText("details", e.target.value)}
            />
            <div />
            <TextArea
              style={{ margin: "0.75vh", width: "34vw" }}
              placeholder="Contact information"
              defaultValue={contract.contact}
              onChange={e => this.updateText("contact", e.target.value)}
            />
          </form>
        </Modal>
        <div>
          <Modal
            title="Delete Contract"
            visible={this.state.visibleDeny}
            onOk={this.handleOkDeny}
            onCancel={this.handleCancelDeny}
            footer={[
              <Button key="cancel" onClick={this.handleCancelDeny}>
                Close
              </Button>,
              <Button type="danger" key="deny" onClick={this.handleDeny}>
                Delete
              </Button>
            ]}
          >
            <p>
              <strong>
                Deleting this contract will remove it permanently from the list
                of available contracts. Be sure this is what you intend to do.{" "}
              </strong>
            </p>
          </Modal>
        </div>
        <div>
          <Modal
            title="Award Contract"
            visible={this.state.visibleAward}
            onOk={this.handleOkAward}
            onCancel={this.handleCancelAward}
            footer={[
              <Button key="cancel" onClick={this.handleCancelAward}>
                Close
              </Button>,
              <Button
                type="primary"
                key="award"
                style={{ background: "#389e0d" }}
                onClick={this.handleAward}
              >
                Award
              </Button>
            ]}
          >
            <p>
              <strong>
                From the list of submitted bids, select the user(s) who will
                receive the contract.{" "}
              </strong>
            </p>
            {bidCheckList}
          </Modal>
        </div>
      </div>
    );
  }
}

export default ContractMgmtDisplay;
