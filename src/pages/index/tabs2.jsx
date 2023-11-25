import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import React, { Component, useState } from "react";
import Hot from "./hot";
import New from "./new";
import New from "./Images.jsx";
import { tags } from "../const/app.js";

export default () => {
  const [current, setCurrent] = useState(0);
  const onClick = (value) => {
    setCurrent(value);
  };
  const tabList = tags.map((tag) => ({ title: tag }));
  return (
    <AtTabs
      current={current}
      tabList={tabList}
      swipeable={true}
      scroll
      onClick={onClick}
    >
      {tabList.map((tab, index) => (
        <AtTabsPane current={current} index={index}>
          <View style="">
            
          </View>
        </AtTabsPane>
      ))}
    </AtTabs>
  );
};
