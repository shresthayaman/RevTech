import React from "react";
import "antd/dist/antd.css";

import PendingContract from "./PendingContract";
import ContractMgmt from "./ContractMgmt";

import { Layout, Menu, Icon, Button } from "antd";
import InputDetails from "./ContractInputDetails";
import WebsiteUsers from "./WebsiteUsers";
import AdminDailyChallenge from "./AdminDailyChallenge";
import "./WebsiteUsers.css";

const { Header, Sider, Content } = Layout;

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      page: ""
    };
  }

  handleMenuClick = tab => {
    this.setState({
      page: tab
    });
  };

  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={{ height: "100vh", margin: 0, padding: 0 }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="0" style={{ height: 130 }} selectable="false">
              <Icon type="" />
              <span>Admins Page</span>
            </Menu.Item>
            <Menu.Item key="1" onClick={() => this.handleMenuClick("users")}>
              <Icon type="user" />
              <span>Website Users</span>
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => this.handleMenuClick("challenges")}
            >
              <Icon type="form" />
              <span>Daily Challenges</span>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => this.handleMenuClick("pendingContracts")}
            >
              <Icon type="clock-circle-o" />
              <span>Pending Contracts</span>
            </Menu.Item>
            <Menu.Item
              key="4"
              onClick={() => this.handleMenuClick("manageContracts")}
            >
              <Icon type="idcard" />
              <span>Manage Contracts</span>
            </Menu.Item>
            <Menu.Item />
            <Menu.Item />
            <Menu.Item>
              <div className="button-container-toggle">
                <Button onClick={this.props.userView}> Toggle to User </Button>
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className="button-container-logout">
                <Button onClick={this.props.logout}> Logout </Button>
              </div>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "155px 16px",
              padding: 24,
              background: "#fff",
              height: "100%",
              width: "auto",
              marginTop: 30
            }}
          >
            {this.state.page === "" && <WebsiteUsers />}
            {this.state.page === "users" && <WebsiteUsers />}

            {this.state.page === "challenges" && <AdminDailyChallenge />}
            {this.state.page === "pendingContracts" && (
              <div>
                {" "}
                <PendingContract />{" "}
              </div>
            )}
            {this.state.page === "manageContracts" && (
              <div>
                {" "}
                <ContractMgmt />{" "}
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
