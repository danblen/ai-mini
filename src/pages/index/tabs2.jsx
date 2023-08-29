import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import React, { Component } from "react";
import Hot from "./hot";
import New from "./new";
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0
    };
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }
  render() {
    return (
      <AtTabs
        current={this.state.current}
        tabList={[{ title: "热门" }, { title: "精选" }, { title: "最新" }]}
        swipeable={true}
        onClick={this.handleClick.bind(this)}
      >
        <AtTabsPane current={this.state.current} index={0}>
          <View style="">
            <Hot />
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style="">
            <New />
          </View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style=""></View>
        </AtTabsPane>
      </AtTabs>
    );
  }
}
