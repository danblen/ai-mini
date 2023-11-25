// import { useTextSelection } from "@reactuses/core";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import React, { useState, useEffect, useCallback } from "react";
import Taro from "@tarojs/taro";
import { imageUrls } from "./const";
import image from "./index.jpg";
export default () => {
  return (
    <View className="">
      <View className="">
        {imageUrls.map((src) => (
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
              src={image}
            ></Image>
          </View>

          // <View className="at-row">
          //   <View className="at-col " style={Styles.image}>
          //     <Image className="at-col w100 h100 " src={image}></Image>
          //   </View>
          //   <View className="at-col " style={Styles.image}>
          //     <Image className="at-col w100 h100 " src={image}></Image>
          //   </View>
          // </View>
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
