import Taro from "@tarojs/taro";
import { View, ScrollView, Image } from "@tarojs/components";
import React, { useState, useEffect, useRef } from "react";
import { AtIcon } from "taro-ui";
import { getSwapQueueResult } from "../../api";

export default (images) => {
  // const [images, setImages] = useState([]);
  const timersRef = useRef({});
  useEffect(() => {
    return () => {
      Object.keys(timersRef.current).forEach((key) => {
        clearInterval(timersRef.current[key]);
      });
    };
  }, []);

  const onPreviewImage = (index) => {};

  // const getImage = async (requestId) => {
  //   const newImage = {
  //     path: "",
  //     status: "pending",
  //     requestId,
  //   };
  //   setImages((prevImages) => [...prevImages, newImage]);

  //   timersRef.current[requestId] = setInterval(async () => {
  //     const requestData = {
  //       user_id: "",
  //       request_id: requestId,
  //       sql_query: {
  //         request_status: "",
  //         user_id: "",
  //       },
  //     };

  //     let res = await getSwapQueueResult(requestData).catch(() => {
  //       clearInterval(timersRef.current[requestId]);
  //     });

  //     if (res.status === "finishing") {
  //       setImages((prevImages) =>
  //         prevImages.map((image) =>
  //           image.requestId === requestId
  //             ? {
  //                 ...image,
  //                 path: "data:image/png;base64," + res.result.images[0],
  //                 status: "SUCCESS",
  //               }
  //             : image
  //         )
  //       );
  //       clearInterval(timersRef.current[requestId]);
  //     }
  //   }, 4000);
  // };

  return (
    <View style={{ background: "black" }}>
      <View
        onClick={() => {
          Taro.reLaunch({
            url: "/pages/album/index",
          });
        }}
      >
        作品集
        <AtIcon value="chevron-right" size="22" />
      </View>

      <ScrollView className="images-scroll">
        {images.length ? (
          images.map((image, index) => (
            <View key={index} className="image-container">
              {image.status === "pending" ? (
                <View className="loading-container">
                  <Loading />
                  <View>制作中</View>
                </View>
              ) : (
                <Image
                  style={{ width: "300rpx", height: "300rpx" }}
                  src={image.src}
                  mode="widthFix"
                  onClick={() => {
                    Taro.previewImage({
                      current: index,
                      urls: images.map((image) => image.path),
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
