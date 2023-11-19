import { View, Text, Image } from "@tarojs/components";
import React, { useState, useRef } from "react";
import { NavBar, Tabs, Swiper } from "@nutui/nutui-react-taro";
import { Left, Share, Close } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { pathToBase64 } from "/utils/image-tools.js";
const App = () => {
  const swiperRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);

  async function swap() {
    this.srcBase64 = await pathToBase64(this.src);
    this.tarBase64 = await pathToBase64(this.$refs.uploadRef.selectedImageUrl);
    data.init_images = [this.srcBase64];
    data.alwayson_scripts.roop.args[0] = this.tarBase64;
    let res1 = await faceSwap(data);
    if (res1.status === "pending") {
      this.$refs.imageRowRef.getImage(res1.request_id);
    } else {
      uni.showToast({
        title: res1.error_message,
        icon: "none",
      });
    }
  }
  return (
    <>
      <Image
        className="w100 h100"
        src="https://danblen.github.io/static/index.jpg"
      ></Image>
      <u-button
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
      </u-button>
    </>
  );
};
export default App;
