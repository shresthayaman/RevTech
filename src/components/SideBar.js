
import React from "react";
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import DisplayContracts from './ContractInput'
import InputDetails from './ContractInputDetails'
const { Header, Sider, Content } = Layout;





export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {
       tab: 0
    };
  }



  handleMenuClick1(){
  console.log("Hello!")

  }
    handleMenuClick2(){
      this.setState({
        tab: 1
      })
      console.log("happy")
      return 
      <div>
        < DisplayContracts />
        < InputDetails />
      </div>

  }


    handleMenuClick3(){
  console.log("Am!")

  }
    handleMenuClick4(){
  console.log("Dickbutt!")

  }





   state = {
    collapsed: false,

    
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }




  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
           <Menu.Item key="0" style= {{height: 130}}>
              <Icon type="" />
              <span>Admins Page</span>
            </Menu.Item>
            <Menu.Item key="1" onClick={this.handleMenuClick1}>
              <Icon type="user" />
              <span>Website Users</span>
            </Menu.Item>



            <Menu.Item key="2" onClick={this.handleMenuClick2.bind(this)}>
              <Icon type="form" />
              <span>Daily Challenges</span>
            </Menu.Item>




            <Menu.Item key="3" onClick={this.handleMenuClick3}>
              <Icon type="clock-circle-o" />
              <span>Pending Contract Editors</span>
            </Menu.Item>





            <Menu.Item key="4" onClick={this.handleMenuClick4}>
              <Icon type="idcard" />
              <span>Contract Management</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>



          <Content style={{ margin: '155px 16px', padding: 24, background: '#fff', minHeight: 380, marginTop:30 }}>
            <img src={require("./dickbutt.jpg")} className="Nathan" />
            {this.state.tab === 1 && <InputDetails />}

            <div id="divId1">
            </div>
            
          </Content>
        </Layout>
      </Layout>
    );
  }
}
