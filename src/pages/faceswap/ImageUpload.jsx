import { AtImagePicker } from "taro-ui";
import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState } from "react";
import Taro from "@tarojs/taro";
export default ({ onFilesChange, onSelectImage }) => {
  const [files, setFiles] = useState([
    // {
    //   url: "https://danblen.github.io/static/index.jpg",
    // },
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View>
      <AtImagePicker
        length={5}
        count={2}
        style={{ height: "100rpx" }}
        files={files}
        onChange={(newFiles) => {
          setFiles(newFiles);
          onFilesChange(newFiles);
        }}
        onFail={(mes) => {}}
        onImageClick={(index, file) => {
          setSelectedIndex(index);
          Taro.showToast({ title: `当前选择第${index + 1}张`, icon: "none" });
          onSelectImage(index);
          // Taro.previewImage({
          //   current: index,
          //   urls: files.map((image) => image.url),
          // });
        }}
      />
    </View>
  );
};
