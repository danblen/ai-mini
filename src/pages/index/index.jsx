import { View, Text } from "@tarojs/components";
import React, { useState, useRef } from "react";
import { NavBar, Tabs, Swiper } from "@nutui/nutui-react-taro";
import { Left, Share, Close } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import Hot from "./hot";
import New from "./new";
import Tabs1 from "./tabs";
import Tabs2 from "./tabs2";
// import "taro-ui/dist/style/components/button.scss"; // 按需引入
import { AtButton } from "taro-ui";
// import "taro-ui/dist/style/components/flex.scss";
// import "taro-ui/dist/style/components/grid.scss";
const App = () => {
  const swiperRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <>
      <NavBar>
        <span onClick={e => Taro.showtoast({ title: "标题" })}>ai写真</span>
      </NavBar>
      {/* <Tabs1/> */}
      <Tabs2/>
    </>
  );
};
export default App;
