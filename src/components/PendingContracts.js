import React, { Component } from 'react';
import { Card, Checkbox, Button, Modal } from 'antd';
import fire from './fire'

const CheckboxGroup = Checkbox.Group;


class PendingContracts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingContracts: []
        }
    }

    componentDidMount() {
        fire.database().ref('Contracts').on('value', (snapshot) => {
            let contracts = [];
            let allContracts = snapshot.val();
            for (let contract in allContracts) {
                if (!allContracts[contract].approve) {
                    let pushContract = {
                        id: contract,
                        approve: false,
                        company: allContracts[contract].company,
                        contact: allContracts[contract].contact,
                        detail: allContracts[contract].detail,
                        phoneNumber: allContracts[contract].phoneNumber
                    }
                    contracts.push(pushContract);
                }
            }
            this.setState({
                pendingContracts: contracts
            });
        })
    }

    accept = (id) => {
        fire.database().ref(`Contracts/${id}`).update({
            approve: true
        });
    }

    deny = (id) => {
        //fire.database().ref(`Contracts/${id}`).remove()
        /*
            that comand is to remove the contract from the database, but
            i want a pop up to say like "are you sure you want to delete this contract" or
            something of that nature.
        */
    }

    render() {
        let displayPendingContracts = this.state.pendingContracts.map((contract) => {
            return (
                <Card bordered={true} title={contract.company}>
                    <p>{contract.contact}</p>
                    <p>{contract.detail}</p>
                    <p>{contract.phoneNumber}</p>
                    <Button onClick={() => this.accept(contract.id)}>
                        Accept
                    </Button>
                    <Button type="danger" onClick={() => this.deny(contract.id)}>
                        Deny
                    </Button>
                </Card>
            );
        });
        return (
            <div>
                {displayPendingContracts}
            </div>
        );
    }
}

export default PendingContracts