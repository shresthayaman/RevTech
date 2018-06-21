import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import './Identity.css';
const TabPane = Tabs.TabPane;


class Identity extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="identity-container">
            <p className="affiliatesLoginText">Interns, alumni, and admins, log in here: </p>
            <br />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Login" key="1">
                        <LoginForm />
                    </TabPane>
                    <TabPane tab="Sign Up" key="2">
                        <SignUpForm />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Identity;