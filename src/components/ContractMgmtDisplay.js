import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Modal, Input, message, Checkbox } from "antd";
import "./ContractMgmt.css";
import fire from "./fire.js";
import "antd/dist/antd.css";

class ContractMgmtDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEdit: false,
      visibleDeny: false,
      visibleAward: false,
      checked: false,
      user: "",
      details: "",
      contact: "",
      bids: [],
      disabled: true,
      awardColor: "#015249",
      selectedBids: []
    };
    this.handleCheck = this.handleCheck.bind(this);
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
    message.error("Contract deleted!");
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
    message.success("Contract awarded!");
    this.setState({
      visibleAward: false
    });
  };

  handleCheck = e => {
    this.setState({
      checked: !this.state.checked
    });
    let selection = this.state.selectedBids;
    if (this.state.checked === true) {
      selection.push(e.target.value);
      this.setState({
        selectedBids: selection
      });
    } else {
      var index = selection.indexOf(e.target.value);
      if (index > -1) {
        selection.splice(index, 1);
      }
      this.setState({
        selectedBids: selection
      });
    }
  };

  componentDidMount() {
    this.setState({
      details: this.props.contract.detail,
      contact: this.props.contract.contact,
      bids: this.props.contract.bids
    });
    if (this.props.contract.bids && this.state.selectedBids[0]) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({ awardColor: "#efefef" });
    }
  }

  render() {
    const { contract, id } = this.props;
    const { visible, confirmLoading } = this.state;
    const { TextArea } = Input;
    if (contract.bids) {
      console.log(contract.bids);
    } else {
      console.log("No bids");
    }
    let bidCheckList = null;
    if (contract.bids) {
      bidCheckList = contract.bids.map(bid => {
        return (
          <div className="Checkboxes">
            <Checkbox onClick={this.handleCheck}>
              {" "}
              {bid.bidder} billing {bid.hours} hours at ${bid.rate} per hour (${bid.hours *
                bid.rate}{" "}
              total){" "}
            </Checkbox>
            <br />
          </div>
        );
      });
    } else {
      bidCheckList = <p> No bids found. </p>;
    }
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
              <Button onClick={this.handleClickEdit}>Edit</Button>
              &emsp;
            </div>
            <div>
              <Button
                type="primary"
                style={{ background: "#015249" }}
                onClick={this.handleClickAward}
              >
                Bids
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
              </Button>
            ]}
          >
            <p>
              <strong>Submitted bids from interns and alumni:</strong>
            </p>
            {bidCheckList}
          </Modal>
        </div>
      </div>
    );
  }
}

export default ContractMgmtDisplay;
