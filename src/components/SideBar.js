import React from "react";
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, Button } from 'antd';
import InputDetails from './ContractInputDetails';
import WebsiteUsers from './WebsiteUsers';
import AdminMarket from './AdminMarket';
import './WebsiteUsers.css';

const { Header, Sider, Content } = Layout;

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
      page: ""
    };
  }


  handleMenuClick = (tab) => {
    this.setState({
      page: tab
    })
  }

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="0" style={{ height: 130 }} selectable="false">
              <Icon type="" />
              <span>Admins Page</span>
            </Menu.Item>
            <Menu.Item key="1" onClick={() => this.handleMenuClick("users")}>
              <Icon type="user" />
              <span>Website Users</span>
            </Menu.Item>
            <Menu.Item key="2" onClick={() => this.handleMenuClick("challenges")}>
              <Icon type="form" />
              <span>Daily Challenges</span>
            </Menu.Item>
            <Menu.Item key="3" onClick={() => this.handleMenuClick("pendingContracts")}>
              <Icon type="clock-circle-o" />
              <span>Pending Contracts</span>
            </Menu.Item>
            <Menu.Item key="4" onClick={() => this.handleMenuClick("manageContracts")}>
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
          <Content style={{ margin: '155px 16px', padding: 24, background: '#fff', minHeight: 380, marginTop: 30 }}>
            {this.state.page === "" && <WebsiteUsers />}
            {this.state.page === "users" && <WebsiteUsers />}
            {this.state.page === "challenges" && <div> challenges </div>}
            {this.state.page === "pendingContracts" && <div> <AdminMarket /> </div>}
            {this.state.page === "manageContracts" && <div> manage contract bids </div>}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
