import React from "react";
import "antd/dist/antd.css";
import { List, Avatar, Icon, Button, Table } from "antd";

import ChallengeDisplay from "./ChallengeDisplay";
import "./ChallengeList.css";

const listData = [];
for (let i = 0; i < 35; i++) {
  listData.push({
    title: `Daily Challenege ${i}`,
    description: `Ant Design Description ${i}`,
    dueDate: `1/${i}/18`
  });
}

export default class ChallenegeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      challenegeArray: [],
      clickedChallenge: {
        title: "Daily Challenege",
        description:
          "Ant Design, a design language for background applications,",
        dueDate: "1/21/18"
      }
    };
  }

  handleClick = item => {
    this.setState({
      clickedChallenge: item
    });
  };

  render() {
    return (
      <div className="challenegeList">
        <ChallengeDisplay clickedChallenge={this.state.clickedChallenge} />
        <List
          itemLayout="vertical"
          size="default"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 5
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item key={item.title}>
              <div className="listItem">
                <a onClick={() => this.handleClick(item)}>{item.title}</a>
                {item.dueDate}
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
