// import { useTextSelection } from "@reactuses/core";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
// import { imageUrls } from "./const";
import { list_files } from "../../api";
export default ({ imageUrls }) => {
  return (
    <View className="">
      <View className="">
        {imageUrls?.map?.((src) => (
          <View className="" style={Styles.imageWrap}>
            <Image
              style={Styles.image}
              mode="aspectFill"
              lazyLoad={true}
              className=" "
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/faceswap/index?imageUrl=" + src,
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
