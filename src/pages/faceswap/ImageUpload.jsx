import Taro from "@tarojs/taro";
import { AtImagePicker } from "taro-ui";
import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState } from "react";
export default ({ onFilesChange }) => {
  const [files, setFiles] = useState([
    {
      url: "https://danblen.github.io/static/index.jpg",
    },
  ]);

  return (
    <View>
      <AtImagePicker
        length={5}
        style={{ height: "100rpx" }}
        files={files}
        onChange={(newFiles) => {
          setFiles(newFiles);
          onFilesChange(newFiles);
        }}
        onFail={(mes) => {}}
        onImageClick={(index, file) => {
          // Taro.previewImage({
          //   current: index,
          //   urls: files.map((image) => image.url),
          // });
        }}
      />
    </View>
  );
};
