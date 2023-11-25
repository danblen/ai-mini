// import { useTextSelection } from "@reactuses/core";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
const faceswapPage =
  "/pages/faceswap/index?imageUrl=https://danblen.github.io/static/index.jpg";

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
  return (
    <View className="">
      <View className="">
        <Image
          style={Styles.image}
          className=" "
          mode="scaleToFill"
          onClick={() => {
            Taro.navigateTo({
              url: faceswapPage,
            });
          }}
          src={albumData.url}
        ></Image>
        {albumData.albumUrls.map((url) => (
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
    </View>
  );
};
const Styles = {
  image: {
    width: "360rpx",
  },
  imageWrap: {
    paddingLeft: "10rpx",
    display: "inline-block",
  },
};
