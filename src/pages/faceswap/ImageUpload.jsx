import Taro from "@tarojs/taro";
import { AtImagePicker } from "taro-ui";
import { View, Text, Image, Button } from "@tarojs/components";
import React, { useState } from "react";
export default () => {
  const [files, setFiles] = useState([
    {
      url: "https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg",
    },
    {
      url: "https://jimczj.gitee.io/lazyrepay/aragaki2.jpeg",
    },
    {
      url: "https://jimczj.gitee.io/lazyrepay/aragaki3.png",
    },
  ]);

  const onChange = (newFiles) => {
    setFiles(newFiles);
  };

  const onFail = (mes) => {
  };

  const onImageClick = (index, file) => {
  };

  return (
    <View>
      <AtImagePicker
        files={files}
        onChange={onChange}
        onFail={onFail}
        onImageClick={onImageClick}
      />
    </View>
  );
};
