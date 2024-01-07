// 将按键浮在图片上方
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { View, Image, ScrollView } from "@tarojs/components";

const ImageList = ({ images, loadMore }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedMode, setSelectedMode] = useState(false);

  const handleScrollToLower = () => {
    loadMore();
  };

  const toggleSelectImage = (index) => {
    if (selectedMode) {
      if (selectedImages.includes(index)) {
        setSelectedImages(
          selectedImages.filter((selected) => selected !== index)
        );
      } else {
        setSelectedImages([...selectedImages, index]);
      }
    } else {
      Taro.previewImage({
        current: images[index],
        urls: images,
      });
    }
  };

  const handleDeleteSelectedImages = () => {
    if (selectedImages.length) {
      Taro.showModal({
        title: "确认删除",
        content: "确定要删除选中的图像吗？",
        success: function (res) {
          if (res.confirm) {
            setSelectedImages([]);
            // 处理删除后的逻辑，比如更新图像列表或者触发外部回调
          }
        },
      });
    }
  };

  const handleDeleteAllImages = () => {
    Taro.showModal({
      title: "确认删除",
      content: "确定要删除全部图像吗？将不会留下任何记录~",
      success: function (res) {
        if (res.confirm) {
          setSelectedImages([]);
          // 处理删除全部图片的逻辑，比如更新图像列表或者触发外部回调
        }
      },
    });
  };

  const handleToggleMode = () => {
    if (selectedMode) {
      // 如果是从选择模式切换到预览模式，清空已选择的图片数组
      setSelectedImages([]);
    }
    setSelectedMode(!selectedMode); // 切换选择模式
  };

  return (
    <View style={{ position: "relative" }}>
      <ScrollView
        scrollY
        style={{ height: "100vh" }}
        onScrollToLower={handleScrollToLower}
      >
        <View className="image-list" style={{ position: "relative" }}>
          {images?.map((image, index) => (
            <View
              key={index}
              style={{
                position: "relative",
                paddingLeft: "10rpx",
                display: "inline-block",
                marginBottom: "20px", // 图片间距
              }}
            >
              <Image
                className="image"
                src={image}
                mode="widthFix"
                style={{
                  width: "360rpx",
                  borderRadius: "10rpx",
                  border: selectedImages.includes(index) ? "2px solid red" : "", // 根据选中状态添加边框
                }}
                lazyLoad={true}
                onClick={() => toggleSelectImage(index)} // 根据模式执行不同的操作
              />
              {selectedImages.includes(index) && (
                <View
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    zIndex: "10",
                  }}
                >
                  <AtIcon
                    value="close-circle"
                    size="20"
                    color="#e80505"
                    onClick={() => toggleSelectImage(index)}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          display: "flex",
          position: "sticky",
          bottom: "800px",
          zIndex: 100,
          backgroundColor: "rgba(255, 255, 255, 0)",
        }}
      >
        <View style={{ textAlign: "center" }}>
          <AtIcon
            value="list"
            size="24"
            color="#054622"
            onClick={handleToggleMode} // 点击选择按钮时切换模式
          />
          {selectedMode ? "取消" : "选择"}
        </View>
        {selectedMode && (
          <View style={{ textAlign: "center" }}>
            <AtIcon
              value="trash"
              size="24"
              color="#054622"
              onClick={handleDeleteAllImages}
            />
            删除全部
          </View>
        )}
        {selectedMode && (
          <View style={{ textAlign: "center" }}>
            <AtIcon
              value="trash"
              size="24"
              color="#054622"
              onClick={handleDeleteSelectedImages}
            />
            删除选中
          </View>
        )}
      </View>
    </View>
  );
};

export default ImageList;
