import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import { Button, Modal, Input, message } from "antd";
import "./PendingContract.css";
import fire from "./fire.js";
import "antd/dist/antd.css";
import { relative } from "path";

class PendingContractDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleEdit: false,
      visibleDeny: false,
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
  handleClickApprove = () => {
    message.success("Contract approved!");
    let contractId = this.props.contract.id;
    const contractRef = fire.database().ref(`/Contracts/${contractId}`);
    contractRef.update({ approve: true });
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
    this.setState({
      visibleDeny: false
    });
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
  componentDidMount() {
    this.setState({
      details: this.props.contract.detail,
      contact: this.props.contract.contact
    });
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
                onClick={this.handleClickApprove}
              >
                Approve
              </Button>
              &emsp;
            </div>
            <div>
              <Button type="danger" onClick={this.handleClickDeny}>
                Deny
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
            title="Deny Contract"
            visible={this.state.visibleDeny}
            onOk={this.handleOkDeny}
            onCancel={this.handleCancelDeny}
            footer={[
              <Button key="cancel" onClick={this.handleCancelDeny}>
                Close
              </Button>,
              <Button type="danger" key="deny" onClick={this.handleDeny}>
                Deny
              </Button>
            ]}
          >
            <p>
              <strong>
                Denying this contract will remove it permanently from the list
                of available contracts. Be sure this is what you intend to do.{" "}
              </strong>
            </p>
          </Modal>
        </div>
      </div>
    );
  }
}

export default PendingContractDisplay;
