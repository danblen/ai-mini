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

  const onChange = (newFiles) => {
    setFiles(newFiles);
    onFilesChange(newFiles);
  };

  const onFail = (mes) => {};

  const onImageClick = (index, file) => {};

  return (
    <View>
      <AtImagePicker
        length={5}
        style={{ height: "100rpx" }}
        files={files}
        onChange={onChange}
        onFail={onFail}
        onImageClick={onImageClick}
      />
    </View>
  );
};
