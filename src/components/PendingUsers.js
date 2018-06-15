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
                        status: allUsers[user].status,
                        email: allUsers[user].email
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

    approve = (id, email) => {
        fire.database().ref(`Users/${id}`).update({
            approve: true
        });
        console.log("right before create user with email and password")
        console.log(email)
        fire.auth().createUserWithEmailAndPassword(email, "helloworld").catch(function (error) {
            let errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                alert('Email entered is already in use.');
            }
            else if (errorCode === 'auth/invalid-email') {
                alert('Email address is not valid');
            }
            else if (errorCode === 'auth/operation-not-allowed') {
                alert('Email and password accoutns are not enabled.');
            }
            else {
                alert('Weak password. Try making password longer and include digits.');
            }
        });
    }

    deny = (id) => {
        fire.database().ref(`Users/${id}`).remove()
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
                                    title={user.name}
                                />
                                <div className="status-toolbar">
                                    {user.status}
                                </div>
                                <Button onClick={() => this.approve(user.id, user.email)}>
                                    Approve
                                </Button>
                                <Button type="danger" onClick={() => this.deny(user.id, user.email)}>
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