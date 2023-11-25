// import { useTextSelection } from "@reactuses/core";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
import { albums } from "./const";
import image from "./index.jpg";
const photoPage = "/pages/photo/index";
export default () => {
  return (
    <View className="" style={Styles.container}>
      <Text style={Styles.title}>写真集</Text>
      <ScrollView
        style={Styles.scroll}
        scrollX
        scrollWithAnimation
        className=""
      >
        {albums.map((albumData) => (
          <View className="" style={Styles.imageWrap}>
            <Image
              style={Styles.image}
              className=" "
              mode="scaleToFill"
              onClick={() => {
                Taro.navigateTo({
                  url: photoPage,
                  success: function (res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit("acceptDataFromOpenerPage", {
                      albumData: albumData,
                    });
                  },
                });
              }}
              src={albumData.url}
            ></Image>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const Styles = {
  title: {
    lineHeight: "60rpx",
    color: "#121",
    fontSize: "30rpx",
  },
  container: {
    borderRadius: "10rpx",
    background: "gray",
    margin: "10rpx",
  },
  image: {
    width: "360rpx",
    borderRadius: "10rpx",
    display: "inline-block",
  },
  imageWrap: {
    paddingLeft: "10rpx",
    display: "inline-block",
  },
  scroll: {
    whiteSpace: "nowrap",
  },
};