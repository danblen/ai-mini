import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState, useRef, useEffect } from "react";
import { NavBar, Tabs, Swiper } from "@nutui/nutui-react-taro";
import { Left, Share, Close } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import { AtButton, AtDrawer, AtIcon } from "taro-ui";
import { data } from "./const.js";
import {
  pathToBase64,
  pathToBase642,
  downloadImages,
} from "../../utils/image-tools.js";
import { faceSwap } from "../../api/index.js";
import indexImage from "./index.jpg";
import TaskAlbum from "./TaskAlbum.jsx";
import ImageUpload from "./ImageUpload.jsx";
export default () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(async () => {
    // 获取传递过来的参数
    const params = Taro.getCurrentInstance().router.params;
    if (params && params.imageUrl) {
      const url = await downloadImages(params.imageUrl);
      setImageUrl(params.imageUrl);
    }
  }, []);
  const [images, setImages] = useState([]);

  const getImage = async (requestId) => {
    const newImage = {
      path: "",
      status: "pending",
      requestId,
    };
    setImages((prevImages) => [...prevImages, newImage]);

    timersRef.current[requestId] = setInterval(async () => {
      const requestData = {
        user_id: "",
        request_id: requestId,
        sql_query: {
          request_status: "",
          user_id: "",
        },
      };

      let res = await getSwapQueueResult(requestData).catch(() => {
        clearInterval(timersRef.current[requestId]);
      });

      if (res.status === "finishing") {
        setImages((prevImages) =>
          prevImages.map((image) =>
            image.requestId === requestId
              ? {
                  ...image,
                  src: "data:image/png;base64," + res.result.images[0],
                  status: "SUCCESS",
                }
              : image
          )
        );
        clearInterval(timersRef.current[requestId]);
      }
    }, 4000);
  };

  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
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
  const [uploadedFiles, setUploadedFiles] = useState([]);

  return (
    <View
      onTouchstart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ background: "black", height: "100vh" }}
    >
      <View
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "90vh",
        }}
      >
        <Image
          mode="aspectFill"
          style={{ width: "100%", verticalAlign: "middle" }}
          src={imageUrl}
        />
      </View>
      <View
        style="
          position: fixed;
          right: 0;
          top: 100rpx;
          opacity: 0.3;
          padding-left: 8rpx;
          font-size: 26rpx;
          color: white;
          background: black;
          border-radius: 10rpx 0 0 10rpx;
        "
        onClick={() => {
          setShowDrawer(true);
        }}
      >
        左滑查看作品
        <AtIcon value="chevron-right" size="20"></AtIcon>
      </View>

      <View
        style={{
          position: "fixed",
          width: "100%",
          bottom: "60rpx",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "95%",
            marginBottom: "40rpx",
            borderRadius: "20rpx",
            background: "grey",
            opacity: 0.5,
            color: "white",
          }}
        >
          <ImageUpload onFilesChange={(images) => setUploadedFiles(images)} />
        </View>
        <View
          style={{
            width: "95%",
          }}
        >
          <AtButton
            type="primary"
            style={{
              background: "linear-gradient(to right, #00467f, #a5cc82)",
              animation: "swap 1s infinite",
              opacity: 0.8,
              fontWeight: "bold",
            }}
            shape="circle"
            onClick={async () => {
              debugger;
              const srcBase64 = await pathToBase642(imageUrl);
              uploadedFiles;
              const tarBase64 = await pathToBase64(indexImage);
              data.init_images = [srcBase64];
              data.alwayson_scripts.roop.args[0] = tarBase64;
              let res = await faceSwap(data);
              if (res.status === "pending") {
                getImage(res.request_id);
              } else {
                Taro.showToast({
                  title: res.error_message,
                  icon: "none",
                });
              }
            }}
          >
            一键换脸
          </AtButton>
        </View>
      </View>

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
