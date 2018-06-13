
import React from "react";
import 'antd/dist/antd.css';
import { Button } from 'antd';

export default class DisplayContracts extends React.Component {
  render() {
    return (
      <div>
        {this.props.showAll.map(contract => {
          return (
            <div>
              <p>Company: {contract.company}</p>
              <p>Contract Details: {contract.details}</p>
              <p>Company Email: {contract.email}</p>
              <p>Company Number: {contract.companyPhone}</p>
            </div>
          );
        })}
      </div>
    );
  }
}