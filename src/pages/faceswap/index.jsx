import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState, useRef, useEffect } from "react";
import { NavBar, Tabs, Swiper } from "@nutui/nutui-react-taro";
import { Left, Share, Close } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
import { AtButton, AtDrawer } from "taro-ui";
import { data } from "./const.js";
import { pathToBase64 } from "../../utils/image-tools.js";
import { faceSwap } from "../../api/index.js";
import indexImage from "./index.jpg";
import TaskAlbum from "./TaskAlbum.jsx";
import ImageUpload from "./ImageUpload.jsx";
export default () => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // 获取传递过来的参数
    const params = Taro.getCurrentInstance().router.params;
    if (params && params.imageUrl) {
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

  const [show, setShow] = useState(false);
  const [startX, setStartX] = useState(0);

  const onClose = () => {
    setShow(false);
  };
  const onTouchStart = (event) => {
    setStartX(event.touches[0].clientX); // 记录触摸起始点的X坐标
  };

  const onTouchEnd = (event) => {
    const endX = event.changedTouches[0].clientX; // 记录触摸结束点的X坐标
    const deltaX = endX - startX; // 计算X轴位移距离

    if (deltaX < -50) {
      setShow(true);
    } else if (deltaX > 50) {
      setShow(false);
    }
  };
  return (
    <View
      onTouchstart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ background: "black" }}
    >
      {/* <Image className="w100 h100" src={imageUrl}></Image> */}
      <View
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Image
          mode="aspectFill"
          style={{ width: " 100%", verticalAlign: "middle" }}
          src={imageUrl}
        />
      </View>

      <View
        style={{
          position: "fixed",
          width: "100%",
          padding: "0 30rpx",
          bottom: "0rpx",
        }}
      >
        <View
          style={{
            marginBottom: "40rpx",
            borderRadius: "20rpx",
            background: "grey",
            opacity: 0.5,
            color: "white",
            width: "90%",
          }}
        >
          <ImageUpload />
        </View>
        <AtButton
          type="primary"
          style={{
            background: "linear-gradient(to right, #00467f, #a5cc82)",
            width: "90%",
            animation: "swap 1s infinite",
            opacity: 0.8,
            fontWeight: "bold",
          }}
          shape="circle"
          className="swap"
          onClick={async () => {
            const srcBase64 = await pathToBase64(indexImage);
            const tarBase64 = await pathToBase64(indexImage);
            data.init_images = [srcBase64];
            data.alwayson_scripts.roop.args[0] = tarBase64;
            let res1 = await faceSwap(data);
            if (res1.status === "pending") {
              getImage(res1.request_id);
            } else {
              uni.showToast({
                title: res1.error_message,
                icon: "none",
              });
            }
          }}
        >
          一键换脸
        </AtButton>
      </View>

      <AtDrawer show={show} right mask onClose={onClose}>
        <TaskAlbum images={images} />
      </AtDrawer>
    </View>
  );
};
