import React, { Component } from 'react';
import { List, Button, Select } from 'antd';
import fire from './fire';
import "./WebsiteUsers.css";

const Option = Select.Option;

class CurrentUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            return "Alumnus"
        }
    }

    componentDidMount() {
        fire.database().ref('Users').on('value', (snapshot) => {
            let approved = [];
            let allUsers = snapshot.val();
            for (let user in allUsers) {
                if (allUsers[user].approve) {
                    let theUser = {
                        id: user,
                        name: allUsers[user].name,
                        status: allUsers[user].status
                    }
                    approved.push(theUser);
                }
            }
            this.setState({
                approvedUsers: approved
            });
        })
    }

    render() {
        return (
            <div>
                <div className="list-container">
                    {this.state.approvedUsers !== null && <List
                        itemLayout="horizontal"
                        dataSource={this.state.approvedUsers}
                        renderItem={user => (
                            <List.Item className="flexbox">
                                <div className="flexbox-item">
                                    <List.Item.Meta
                                        title={user.name}
                                    />
                                </div>
                                <div className="flexbox-item">
                                    {this.getStatus(user.status)}
                                </div>
                                <div className="flexbox-item">
                                    <Select
                                        id="status"
                                        placeholder={this.getStatus(user.status)}
                                        onChange={(e) => this.updateStatus(e, user.id)}
                                        style={{ width: 200 }}
                                    >
                                        {user.status !== "intern" && <Option value="intern">Intern</Option>}
                                        {user.status !== "alum" && <Option value="alum">Alumi</Option>}
                                        {user.status !== "admin" && <Option value="admin">Administrator</Option>}
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

export default CurrentUsers