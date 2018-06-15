import React, { Component } from 'react';
import { List, Button } from 'antd';
import fire from './fire';
import "./PendingUsers.css";

class PendingUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingUsers: null,
            approvedUsers: null
        }
    }

    componentDidMount() {
        fire.database().ref('Users').on('value', (snapshot) => {
            let approved = [];
            let notApproved = [];
            let allUsers = snapshot.val();
            for (let user in allUsers) {
                if (!allUsers[user].approve) {
                    let theUser = {
                        id: user,
                        name: allUsers[user].name,
                        status: allUsers[user].status
                    }
                    notApproved.push(theUser);
                }
                else {
                    let theUser = {
                        id: user,
                        name: allUsers[user].name,
                        status: allUsers[user].status
                    }
                    approved.push(theUser);
                }
            }
            this.setState({
                pendingUsers: notApproved,
                approvedUsers: approved
            });
        })
    }

    approve = (id) => {
        fire.database().ref(`Users/${id}`).update({
            approve: true
        });
    }

    deny = (id) => {
        //fire.database().ref(`Users/${id}`).remove()
        /*
            that comand is to remove the contract from the database, but
            i want a pop up to say like "are you sure you want to delete this contract" or
            something of that nature.
        */
    }

    render() {
        return (
            <div>
                <div className="list-container">
                    {this.state.pendingUsers !== null && <List
                        itemLayout="horizontal"
                        dataSource={this.state.pendingUsers}
                        renderItem={user => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">{user.name}</a>}
                                />
                                <div className="status-toolbar">
                                    {user.status}
                                </div>
                                <Button onClick={() => this.approve(user.id)}>
                                    Approve
                                </Button>
                                <Button type="danger" onClick={() => this.deny(user.id)}>
                                    Deny
                                </Button>
                            </List.Item>
                        )}
                    />}
                </div>
                <div className="list-container">
                    {this.state.approvedUsers !== null && <List
                        itemLayout="horizontal"
                        dataSource={this.state.approvedUsers}
                        renderItem={user => (
                            <List.Item>
                                <List.Item.Meta
                                    title={user.name}
                                />
                                <div className="status-toolbar">
                                    {user.status}
                                </div>
                            </List.Item>
                        )}
                    />}
                </div>
            </div>
        );
    }
}

export default PendingUsers