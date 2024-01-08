import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { AtDrawer } from "taro-ui";
import compareIcon from "../../static/image/my/icons8-compare-64.png";
import { downloadImages } from "../../utils/imageTools.js";
import TaskList from "../comps/TaskList.jsx";
import ImagePicker from "../comps/ImagePicker.jsx";
import SwapButton from "./SwapButton.jsx";
import TaskListTip from "./TaskListTip.jsx";
import { clearTimers, getTaskImage } from "../../common/getTaskImage.js";

export default () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [startX, setStartX] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
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
    } else {
      setShowImageSwap(false);
      setShowImageSrc(true);
    }
  }, [images]);
  const onUpdateTaskImages = async (requestId) => {
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

      <TaskListTip onClick={() => setShowDrawer(true)}></TaskListTip>

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
            opacity: 0.8,
            color: "white",
          }}
        >
          <ImagePicker
            onFilesChange={(images) => setUploadedFiles(images)}
            onSelectImage={(index) => {
              setSelectedIndex(index);
            }}
          />
        </View>
        <SwapButton
          canSwap={uploadedFiles[selectedIndex] && imageUrl}
          imageUrl={imageUrl}
          selectedImageUrl={uploadedFiles[selectedIndex]?.url}
          onUpdateTaskImages={onUpdateTaskImages}
        ></SwapButton>
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
