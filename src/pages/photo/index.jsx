// import { useTextSelection } from "@reactuses/core";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
import { AtDrawer } from "taro-ui";
import TaskAlbum from "../comps/TaskAlbum";
import ActionButton from "./ActionButton";
const faceswapPage = "/pages/faceswap/index";

export default () => {
  const [albumData, setAlbumData] = useState([]);
  // 使用 Taro 提供的事件监听函数
  const eventChannel = Taro.getCurrentInstance().page.getOpenerEventChannel();
  // 监听数据传递事件
  eventChannel.on("acceptDataFromOpenerPage", (data) => {
    // 在这里处理接收到的数据
    const albumData = data.albumData;
    // 打印数据，以验证是否成功接收
    setAlbumData(albumData);
    console.log(albumData);
  });

  // useEffect(() => {
  //   const params = Taro.getCurrentInstance().router.params;
  //   console.log(params)
  //   if (params && params.albumData) {
  //     setAlbumData(params.albumData);
  //   }
  // }, []);
  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  const [images, setImages] = useState([]);
  const onTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
  };
  const onTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - startX;

    if (deltaX < -50) {
      setShowDrawer(true);
    } else if (deltaX > 50) {
      setShowDrawer(false);
    }
  };
  return (
    <View className="">
      <View className="">
        <Image
          style={Styles.indexImage}
          className=" "
          mode="scaleToFill"
          onClick={() => {
            Taro.navigateTo({
              url: faceswapPage,
            });
          }}
          src={albumData.index}
        ></Image>
        {albumData.urls?.map((url) => (
          <View className="" style={Styles.imageWrap}>
            <Image
              style={Styles.image}
              className=" "
              mode="scaleToFill"
              onClick={() => {
                Taro.navigateTo({
                  url: faceswapPage,
                });
              }}
              src={url}
            ></Image>
          </View>
        ))}
      </View>
      <ActionButton />
      <AtDrawer
        show={showDrawer}
        right
        mask
        width="80%"
        onClose={() => setShowDrawer(false)}
        style={{ background: "black", height: "100%" }}
      >
        <TaskAlbum images={images} />
      </AtDrawer>
    </View>
  );
};
const Styles = {
  indexImage: {},
  image: {
    width: "360rpx",
    borderRadius: "10rpx",
  },
  imageWrap: {
    paddingLeft: "10rpx",
    display: "inline-block",
  },
};
