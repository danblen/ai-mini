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
import Swiper from "./swiper";
import { data } from "./const";
const darkTheme = {
  nutuiGridItemContentPadding: "0px"
};
const App = () => {
  return (
    <>
      <Swiper></Swiper>
      <Images />
    </>
  );
};
export default App;
