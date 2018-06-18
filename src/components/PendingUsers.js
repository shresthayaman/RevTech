import React, { Component } from 'react';
import { List, Button, Select } from 'antd';
import fire from './fire';
import "./PendingUsers.css";

const Option = Select.Option;

class PendingUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingUsers: [],
            approvedUsers: []
        }
    }

    updateStatus = (e, id) => {
        fire.database().ref(`Users/${id}`).update({
            status: e
        });
    }

    getStatus = (status) => {
        if (status === "admin") {
            return "Administrator"
        }
        else if (status === "intern") {
            return "Intern"
        }
        else {
            return "Alumni"
        }
    }

    componentDidMount() {
        console.log("when does component mount")
        fire.database().ref('Users').on('value', (snapshot) => {
            let approved = [];
            let notApproved = [];
            let allUsers = snapshot.val();
            for (let user in allUsers) {
                console.log(allUsers[user].name, allUsers[user].approve);
                if (!allUsers[user].approve) {
                    let theUser = {
                        id: user,
                        name: allUsers[user].name,
                        status: allUsers[user].status,
                        email: allUsers[user].email,
                        password: allUsers[user].password
                    }
                    console.log(theUser)
                    notApproved.push(theUser);
                }
                else {
                    let theUser = {
                        id: user,
                        name: allUsers[user].name,
                        status: allUsers[user].status
                    }
                    console.log(theUser)
                    approved.push(theUser);
                }
            }
            console.log(approved)
            console.log(notApproved)
            this.setState({
                pendingUsers: notApproved,
                approvedUsers: approved
            });
        })
    }

    approve = (id, email, password) => {
        fire.database().ref(`Users/${id}`).update({
            approve: true
        });
        fire.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
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
        })
        fire.database().ref(`Users/${id}`).update({
            password: null
        })
    }

    deny = (id) => {
        fire.database().ref(`Users/${id}`).remove()
    }

    render() {
        return (
            <div>
                <div>
                    Pending Users
                </div>
                <div className="list-container">
                    {this.state.pendingUsers.length >= 1 && <List
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
                                <Button onClick={() => this.approve(user.id, user.email, user.password)}>
                                    Approve
                                </Button>
                                <Button type="danger" onClick={() => this.deny(user.id, user.email)}>
                                    Deny
                                </Button>
                            </List.Item>
                        )}
                    />}
                </div>
                <div>
                    Current Users
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
                                    {this.getStatus(user.status)}
                                </div>
                                <div>
                                    <Select
                                        id="status"
                                        placeholder="Edit Status"
                                        onChange={(e) => this.updateStatus(e, user.id)}
                                        style={{ width: 200 }}
                                    >
                                        <Option value="intern">Intern</Option>
                                        <Option value="alum">Alumi</Option>
                                        <Option value="admin">Administrator</Option>
                                    </Select>
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