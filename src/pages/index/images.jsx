import { View, Text, Image } from "@tarojs/components";
import React from "react";
import { AtIcon } from "taro-ui";
import Taro from "@tarojs/taro";

export default ({ imageUrls }) => {
  return (
    <View className="">
      <View className="" style={Styles.imageList}>
        {imageUrls?.map?.((src, index) => (
          <View key={index} className="" style={Styles.imageWrap}>
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

            <View className="heat-info" style={Styles.heatInfo}>
              <AtIcon value="eye" size="20" color="#d6d6d6"></AtIcon>
              <Text
                style={{
                  marginLeft: "8px",
                  color: "#e2e1e1",
                  fontSize: "14px",
                }}
                className="heat-value"
              >
                233
              </Text>
            </View>

            <Text className="ellipsis" style={Styles.text}>
              坟头草两米高
            </Text>
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
    position: "relative",
  },
  heatInfo: {
    position: "relative",
    top: "-25px",
    right: "-135px",
    borderRadius: "10%",
    backgroundColor: "rgba(2, 0, 0, 0.08)",
    width: "68px",
  },
  imageWrap: {
    paddingLeft: "10rpx",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  imageList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  text: {
    flex: 1,
    marginTop: "-17px",
    marginBottom: "5px",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // 控制显示行数
    color: "#868686",
  },
};
