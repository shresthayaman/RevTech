import React, { Component } from "react";
import PendingContractDisplay from "./PendingContractDisplay";
import "./PendingContract.css";
import fire from "./fire.js";

class PendingContract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedContracts: [],
      id: "dmk6tm@virginia.edu"
    };
  }
  componentDidMount() {
    const contractsRef = fire.database().ref("Contracts");
    contractsRef.on("value", snapshot => {
      let contracts = snapshot.val();
      let newState = [];
      for (let contract in contracts) {
        if (contracts[contract].approve === false) {
          newState.push({
            id: contract,
            approve: contracts[contract].approve,
            company: contracts[contract].company,
            detail: contracts[contract].detail,
            contact: contracts[contract].contact,
            bids: contracts[contract].bids,
            award: contracts[contract].award
          });
        }
      }
      this.setState({
        approvedContracts: newState
      });
    });
  }
  render() {
    let marketDisplays = this.state.approvedContracts.map(con => {
      return <PendingContractDisplay contract={con} id={this.state.id} />;
    });
    return <div className="flex-container">{marketDisplays}</div>;
  }
}

export default PendingContract;
