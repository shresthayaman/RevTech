import React, { Component } from 'react';
import { Tabs } from 'antd';
import fire from './fire';
import 'antd/dist/antd.css';
import PendingUsers from './PendingUsers';
import CurrentUsers from './CurrentUsers';
import "./Identity.css";

const TabPane = Tabs.TabPane;

class WebsiteUsers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tab-container">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Pending Users" key="1">
                        <PendingUsers />
                    </TabPane>
                    <TabPane tab="Current Users" key="2">
                        <CurrentUsers />
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default WebsiteUsers