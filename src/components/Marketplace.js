import React, { Component } from "react";
import MarketDisplay from "./MarketDisplay";
import "./Marketplace.css";
import fire from "./fire.js";

class Marketplace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedContracts: [],
      id: this.props.id
    };
  }
  componentDidMount() {
    const contractsRef = fire.database().ref("Contracts");
    contractsRef.on("value", snapshot => {
      let contracts = snapshot.val();
      let newState = [];
      for (let contract in contracts) {
        if (contracts[contract].approve === true) {
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
      return <MarketDisplay contract={con} id={this.state.id} />;
    });
    return <div className="flex-container">{marketDisplays}</div>;
  }
}

export default Marketplace;
