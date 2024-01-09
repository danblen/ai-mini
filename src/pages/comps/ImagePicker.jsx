import { AtImagePicker } from "taro-ui";
import { View } from "@tarojs/components";
import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { wxPathToBase64 } from "../../utils/imageTools";

export default function ImagePicker({ onFilesChange, onSelectImage }) {
  const [files, setFiles] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const compressInputImage = async (file) => {
    try {
      let compressedFile;
      let srcBase64;
      let src_size = file.file.size;

      let quality = Math.floor((-0.0738 * src_size) / 1024 + 113.75);
      // 当文件大于200KB时循环压缩
      if (quality < 0) quality = 5;
      while (src_size > 200 * 1024 && quality > 0) {
        console.log("src_size", src_size, quality);
        compressedFile = await Taro.compressImage({
          src: file.url,
          quality,
        });
        srcBase64 = await wxPathToBase64(compressedFile.tempFilePath);
        src_size = srcBase64.length;
        // 根据线性关系调整压缩质量

        quality = Math.floor(-0.0738 * src_size + 113.75); // 动态调整压缩质量

        // 防止负数或过大的压缩质量值
        if (quality > 99) {
          quality = 99;
        }
        console.log("compressed siez", src_size);
      }

      return {
        base64: srcBase64,
      };
    } catch (error) {
      console.error("图片压缩失败：", error);
      return file;
    }
  };

  const handleImageChange = async (newFiles) => {
    try {
      let curIndex = newFiles.length - 1;
      const compressedFile = await compressInputImage(newFiles[curIndex]);
      const updatedFiles = newFiles.map((file, index) => {
        if (index === curIndex) {
          return {
            ...file,
            compressBase64: compressedFile.base64
              ? compressedFile.base64
              : null,
          };
        }
        return file;
      });
      setFiles(updatedFiles);
      setSelectedIndex(curIndex);
      onFilesChange(updatedFiles);
      onSelectImage(updatedFiles.length - 1);
      Taro.showToast({
        title: `当前选择第${curIndex + 1}张`,
        icon: "none",
      });
    } catch (error) {
      console.error("处理图片失败：", error);
    }
  };

  return (
    <View>
      <AtImagePicker
        length={5}
        count={2}
        style={{ height: "100rpx" }}
        files={files}
        onChange={handleImageChange}
        onFail={(mes) => {}}
        onImageClick={(index, file) => {
          setSelectedIndex(index);
          Taro.showToast({ title: `当前选择第${index + 1}张`, icon: "none" });
          onSelectImage(index);
        }}
      />
    </View>
  );
}
