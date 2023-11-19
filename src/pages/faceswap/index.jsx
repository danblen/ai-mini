import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState, useRef } from "react";
import { NavBar, Tabs, Swiper } from "@nutui/nutui-react-taro";
import { Left, Share, Close } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import { AtButton, AtDrawer } from "taro-ui";
import { data } from "./const.js";
import { pathToBase64 } from "../../utils/image-tools.js";
import { faceSwap } from "../../api/index.js";
import indexImage from "./index.jpg";
import TaskAlbum from "./taskAlbum.jsx";
const App = () => {
  const swap = async () => {
    const srcBase64 = await pathToBase64(indexImage);
    const tarBase64 = await pathToBase64(indexImage);
    data.init_images = [srcBase64];
    data.alwayson_scripts.roop.args[0] = tarBase64;
    let res1 = await faceSwap(data);
    if (res1.status === "pending") {
      // this.$refs.imageRowRef.getImage(res1.request_id);
    } else {
      uni.showToast({
        title: res1.error_message,
        icon: "none",
      });
    }
  };

  const [show, setShow] = useState(false);
  const [startX, setStartX] = useState(0);

  const onClose = () => {
    setShow(false);
  };

  const onTouchStart = (event) => {
    console.log(11, event.touches[0].clientX);
    setStartX(event.touches[0].clientX); // 记录触摸起始点的X坐标
  };

  const onTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX; // 记录触摸结束点的X坐标
    const deltaX = endX - startX; // 计算X轴位移距离
    console.log(11, endX);

    if (deltaX < -50) {
      setShow(true);
    } else if (deltaX > 50) {
      setShow(false);
    }
  };
  const opend = () => {
    setShow(true);
  };
  return (
    <View onTouchstart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Image
        className="w100 h100"
        src="https://danblen.github.io/static/index.jpg"
      ></Image>
      <Button
        type="primary"
        style="
          width: 100%;
          animation: swap 1s infinite;
          opacity: 0.8;
          font-weight: bold;
        "
        shape="circle"
        class="swap"
        onClick={swap}
      >
        一键换脸
      </Button>
      <AtDrawer show={show} right mask onClose={onClose}>
        <TaskAlbum />
      </AtDrawer>
    </View>
  );
};
export default App;
