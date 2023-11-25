import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import React, { Component, useState } from "react";
import Hot from "./hot/index.jsx";
import New from "./new/index.jsx";
import Images from "./Images.jsx";
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
            <Images />
          </View>
        </AtTabsPane>
      ))}
    </AtTabs>
  );
};
