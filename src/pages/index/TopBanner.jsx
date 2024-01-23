// import { useTextSelection } from "@reactuses/core";
import {
  Image,
  ScrollView,
  Text,
  View,
  Swiper,
  SwiperItem,
} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import { AtIcon } from "taro-ui";
const photoPage = "/pages/photo/index";
export default ({ banners }) => {
  return (
    <View className="" style={Styles.container}>
      <Swiper
        className="test-h"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
        style={Styles.Swiper}
      >
        {banners?.map?.((banner) => (
          <SwiperItem>
            <Image
              style={Styles.image}
              className=" "
              mode="widthFix"
              onClick={() => {
                Taro.navigateTo({
                  url: "/pages/faceswap/index?imageUrl=" + banner,
                });
              }}
              src={banner}
            ></Image>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
};
const Styles = {
  flexContainer: {
    display: "flex",
    alignItems: "center",
  },
  flexPlaceholder: {
    flex: 1,
  },
  seeAll: {},
  title: {
    lineHeight: "60rpx",
    marginLeft: "10rpx",
    color: "#121",
    fontSize: "30rpx",
  },
  Swiper: {
    height: "600rpx",
  },
  container: {
    height: "600rpx",
    borderRadius: "10rpx",
    background: "linear-gradient(to right, #ecf0f1, #ecf0f1)",
    // margin: "20rpx",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "10rpx",
    display: "inline-block",
  },
  // imageWrap: {
  //   paddingLeft: "10rpx",
  //   display: "inline-block",
  // },
  scroll: {
    whiteSpace: "nowrap",
  },
};
