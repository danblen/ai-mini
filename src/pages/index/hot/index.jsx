import { View, Text, Image } from "@tarojs/components";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  NavBar,
  Tabs,
  Grid,
  ConfigProvider,
  VirtualList
} from "@nutui/nutui-react-taro";
import { Left, Share, Close, Dongdong } from "@nutui/icons-react-taro";
import Images from "./images.jsx";
import Images2 from "./images2.jsx";
import Images3 from "./images3.jsx";
import Swiper from "./swiper";
import Waterfall from "./waterfall.jsx";
import { data } from "./const";
const App = () => {
  return (
    <>
      <Swiper></Swiper>
      <Images />
      {/* <Images2 /> */}
      {/* <Images3 /> */}
      {/* <Waterfall /> */}
    </>
  );
};
export default App;
