import { View,Image } from "@tarojs/components";
import { useState, useRef } from "react";
import { AtTabs, AtTabsPane } from "taro-ui";
import FinishedTask from "./FinishedTask.jsx";
import PendingTask from "./PendingTask.jsx";
import img from "./index.jpg";

const Tab = () => {
  let a = 0;
  return (
    <View style="">
      <FinishedTask
        images={[
          "https://danblen.github.io/static/index.jpg",
          "https://danblen.github.io/static/index.jpg",
        ]}
      />
    </View>
  );
};
export default () => {
  const [current, setCurrent] = useState(0);
  const onClick = (value) => {
    setCurrent(value);
    // const aaa = useRef( );
    // aaa.current.handleScrollToLower();
  };
  return (
    <View>
      <Image src={img}></Image>
      <AtTabs
        current={current}
        tabList={[{ title: "进行中" }, { title: "已完成" }]}
        swipeable={true}
        onClick={onClick}
      >
        <AtTabsPane current={current} index={0}>
          {/* <Tab></Tab> */}
          <View style="">
            <FinishedTask
              images={[
                "https://danblen.github.io/static/index.jpg",
                "https://danblen.github.io/static/index.jpg",
              ]}
            />
          </View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View style="">
            <FinishedTask />
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
};
