import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState, useRef, useEffect } from "react";
import { NavBar, Tabs, Swiper } from "@nutui/nutui-react-taro";
import { Left, Share, Close } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import { AtButton, AtDrawer, AtIcon } from "taro-ui";
import { data } from "./const.js";
import { wxPathToBase64, downloadImages } from "../../utils/image-tools.js";
import { faceSwap, getSwapQueueResult } from "../../api/index.js";
import indexImage from "./index.jpg";
import TaskAlbum from "../comps/TaskAlbum.jsx";
import ImageUpload from "./ImageUpload.jsx";

let timers = {};
const getTaskImage = async (requestId) => {
  return new Promise((resolve, reject) => {
    // 创建一个计时器，每隔3秒执行一次
    timers[requestId] = setInterval(async () => {
      const requestData = {
        user_id: "",
        request_id: requestId,
        sql_query: {
          request_status: "",
          user_id: "",
        },
      };

      try {
        // 调用getSwapQueueResult函数获取结果
        let res = await getSwapQueueResult(requestData);

        if (res.status === "finishing") {
          // 更新图像数组中对应请求的图像状态和数据
          resolve(res);
          clearInterval(timers[requestId]);
        }
      } catch (error) {
        reject();
        clearInterval(timers[requestId]);
      }
    }, 3000);
  });
};

export default () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const down = async () => {
      const tempFilePath = await downloadImages(params.imageUrl);
      if (!ignore) setImageUrl(tempFilePath);
    };
    // 获取传递过来的参数
    const params = Taro.getCurrentInstance().router.params;
    let ignore = false;
    if (params && params.imageUrl) {
      down();
    }
    return () => {
      ignore = true;
      Object.keys(timers).forEach((key) => {
        clearInterval(timers[key]);
      });
    };
  }, []);

  const getTaskImages = async (requestId) => {
    const newImage = {
      src: "",
      status: "pending",
      requestId,
    };
    setImages((prevImages) => [...prevImages, newImage]);

    const res = await getTaskImage(requestId);
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
  };

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
          mode="widthFix"
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
          <ImageUpload
            onFilesChange={(images) => setUploadedFiles(images)}
            onSelectImage={(index) => {
              setSelectedIndex(index);
            }}
          />
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
            loading={loading}
            onClick={async () => {
              setLoading(true);
              const srcBase64 = await wxPathToBase64(imageUrl);
              const tarBase64 = await wxPathToBase64(
                uploadedFiles[selectedIndex].url
              );
              data.init_images = [srcBase64];
              data.alwayson_scripts.roop.args[0] = tarBase64;
              let res = await faceSwap(data);
              setLoading(false);
              if (res.status === "pending") {
                getTaskImages(res.request_id);
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
