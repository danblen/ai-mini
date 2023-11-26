// import { useTextSelection } from "@reactuses/core";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
// import { imageUrls } from "./const";
import { list_files } from "../../api";
import image from "./index.jpg";
export default ({ imageUrls }) => {
  return (
    <View className="">
      <View className="">
        {imageUrls?.map?.((src) => (
          <View className="" style={Styles.imageWrap}>
            <Image
              style={Styles.image}
              className=" "
              mode="scaleToFill"
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/faceswap/index?imageUrl=https://danblen.github.io/static/index.jpg",
                });
              }}
              src={src}
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
    borderRadius: "10rpx",
  },
  imageWrap: {
    paddingLeft: "10rpx",
    display: "inline-block",
  },
};
