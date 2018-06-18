import React, { Component } from 'react';
import { List, Button, Select } from 'antd';
import fire from './fire';
import "./WebsiteUsers.css";

const Option = Select.Option;

class PendingUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingUsers: []
        }
    }

    getStatus = (status) => {
        if (status === "admin") {
            return "Administrator"
        }
        else if (status === "intern") {
            return "Intern"
        }
        else {
            return "Alumnus"
        }
    }

    componentDidMount() {
        fire.database().ref('Users').on('value', (snapshot) => {
            let notApproved = [];
            let allUsers = snapshot.val();
            for (let user in allUsers) {
                if (!allUsers[user].approve) {
                    let theUser = {
                        id: user,
                        name: allUsers[user].name,
                        status: allUsers[user].status,
                        email: allUsers[user].email,
                        password: allUsers[user].password
                    }
                    notApproved.push(theUser);
                }
            }
            this.setState({
                pendingUsers: notApproved
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
                <div className="list-container">
                    {this.state.pendingUsers.length >= 1 && <List
                        itemLayout="horizontal"
                        dataSource={this.state.pendingUsers}
                        renderItem={user => (
                            <List.Item>
                                <div className="flexbox-item">
                                    <List.Item.Meta
                                        title={user.name}
                                    />
                                </div>
                                <div className="flexbox-item">
                                    {this.getStatus(user.status)}
                                </div>
                                <div className="flexbox-item">
                                    <Button onClick={() => this.approve(user.id, user.email, user.password)}>
                                        Approve
                                    </Button>
                                    <Button type="danger" onClick={() => this.deny(user.id, user.email)}>
                                        Deny
                                    </Button>
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