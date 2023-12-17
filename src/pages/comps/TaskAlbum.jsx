import Taro from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import React, { useState, useEffect, useRef } from "react";
import { AtIcon } from "taro-ui";
import { getSwapQueueResult } from "../../api";

export default ({ images }) => {
  const timersRef = useRef({});
  useEffect(() => {
    return () => {
      Object.keys(timersRef.current).forEach((key) => {
        clearInterval(timersRef.current[key]);
      });
    };
  }, []);

  return (
    <View style={{ background: "black", height: "100vh", color: "#fff" }}>
      <View
        style={{ background: "black" }}
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/album/index",
          });
        }}
      >
        作品集
        <AtIcon value="chevron-right" size="22" />
      </View>

      <ScrollView style={{ background: "black" }}>
        {images.length ? (
          images.map((image, index) => (
            <View key={index} className="image-container">
              {image.status === "pending" ? (
                <View className="loading-container">
                  {/* <Loading /> */}
                  <View>制作中</View>
                </View>
              ) : (
                <Image
                  style={{ width: "300rpx", height: "300rpx" }}
                  src={image.src}
                  mode="widthFix"
                  onClick={() => {
                    Taro.previewImage({
                      current: image.src,
                      urls: images.map((image) => image.src),
                    });
                  }}
                />
              )}
            </View>
          ))
        ) : (
          <View>暂无数据</View>
        )}
      </ScrollView>
    </View>
  );
};
