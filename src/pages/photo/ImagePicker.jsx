import { Image, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { AtButton, AtIcon } from "taro-ui";
import { faceSwap } from "../../api/index.js";
import { downloadImages, wxPathToBase64 } from "../../utils/imageTools.js";
import ImageUpload from "./ImageUpload.jsx";
import { data } from "./const.js";

export default () => {
  const [imageUrl, setImageUrl] = useState("");
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

  return (
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
  );
};
