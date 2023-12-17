import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { downloadImages } from "../../utils/imageTools.js";
import ImageUpload from "../faceswap/ImageUpload.jsx";

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

  return (
    <ImageUpload
      onFilesChange={(images) => setUploadedFiles(images)}
      onSelectImage={(index) => {
        setSelectedIndex(index);
      }}
    />
  );
};
