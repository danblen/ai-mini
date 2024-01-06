import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { AtButton, AtDrawer, AtIcon } from "taro-ui";
import { faceSwap } from "../../api/index.js";
import compareIcon from "../../static/image/my/icons8-compare-64.png";
import { downloadImages, wxPathToBase64 } from "../../utils/imageTools.js";
import TaskList from "../comps/TaskList.jsx";
import ImageUpload from "./ImageUpload.jsx";
import { data } from "./const.js";
import { clearTimers, getTaskImage } from "./getTaskImage.js";

export default () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [showImageSrc, setShowImageSrc] = useState(true);
  const [showImageSwap, setShowImageSwap] = useState(false);
  const [compareImageSwap, setCompareImageSwap] = useState(false);
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
      clearTimers();
    };
  }, []);
  useEffect(() => {
    if (
      images &&
      images.length > 0 &&
      images[images.length - 1].status === "SUCCESS"
    ) {
      setCompareImageSwap(true);
      setShowImageSwap(true);
      setShowImageSrc(false);
      console.log("show images:", images.length, images);
    } else {
      setShowImageSwap(false);
      setShowImageSrc(true);
    }
  }, [images]);
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
          style={{
            width: "100%",
            verticalAlign: "middle",
            opacity: 1,
            transition: "opacity 1s",
          }}
          src={imageUrl}
        />

        {/* 第二张图，初始时完全不可见，通过动画逐渐显示 */}
        <Image
          mode="widthFix"
          style={{
            width: "100%",
            verticalAlign: "middle",
            position: "absolute",
            right: 0, // 设置初始位置在屏幕右侧
            opacity: compareImageSwap ? 1 : 0, // 根据条件设置透明度
            transition: "opacity 1s",
          }}
          src={
            showImageSwap && images[images.length - 1].status === "SUCCESS"
              ? images[images.length - 1].src
              : imageUrl
          }
        />
        <View
          style={{
            position: "absolute",
            top: "73%",
            left: "90%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            borderRadius: "50%",
          }}
        >
          {showImageSwap && (
            <View
              type="primary"
              onClick={() => setCompareImageSwap((prev) => !prev)}
              style={{
                backgroundColor: showImageSwap ? "#ccc" : "#ccc", // 根据条件设置背景颜色
                width: "50px",
                height: "50px",
                borderRadius: "50%", // 圆形背景
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Image
                src={compareIcon}
                mode="widthFix"
                style={{
                  width: "50rpx",
                  height: "50rpx",
                  position: "absolute",
                  top: "25rpx",
                  left: "25rpx",
                  // filter: showImageSwap ? "grayscale(100%)" : "",
                }}
              />
            </View>
          )}
        </View>
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
              const storageUserInfo = Taro.getStorageSync("userInfo");
              data.user_id = storageUserInfo.data.user_id;
              data.init_images = [srcBase64];
              data.alwayson_scripts.roop.args[0] = tarBase64;
              let res = await faceSwap(data)
                .catch(() => {})
                .finally(() => {
                  setLoading(false);
                });
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
        <TaskList images={images} />
      </AtDrawer>
    </View>
  );
};
