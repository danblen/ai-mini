import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import React, { Component, useState,useEffect } from "react";
import Hot from "./hot/index.jsx";
// import New from "./new/index.jsx";
import Images from "./Images.jsx";
// import { tags } from "../const/app.js";
import { getPhotoPath, URL_BACK } from "../../api";

export default () => {
  let [allImages, setAllImages] = useState({});
  let [imageUrls, setImageUrls] = useState([]);
  const [tabList, setTabList] = useState([]);
  const [current, setCurrent] = useState(0);
  const onClick = (value) => {
    setCurrent(value);
    setImageUrls(allImages[tabList[value].title]);
  };
  debugger;

  const requestServicePhoto = async () => {
    const imagesDir = "images/"; // 静态目录路径
    let subImageDirs = await getPhotoPath(imagesDir).catch(() => {});

    if (subImageDirs != null) {
      let updatedData = { ...allImages }; // 创建临时变量来存储更新后的状态

      for (const classi of subImageDirs) {
        updatedData[classi] = [];

        const classiDir = `${imagesDir}${classi}/`;
        let subClassiDirs = await getPhotoPath(classiDir).catch(() => {});

        if (subClassiDirs != null) {
          subClassiDirs.forEach((images) => {
            images = URL_BACK + "/" + "static/" + classiDir + images;
            updatedData[classi].push(images);
          });
        }
      }
          
      setAllImages(updatedData);
      setTabList(Object.keys(updatedData).map((key) => ({ title: key })));
    }
  };
  useEffect(() => {
    requestServicePhoto();
  }, []);
  return (
    <>
      <AtTabs
        current={current}
        tabList={tabList}
        swipeable={true}
        scroll
        onClick={onClick}
      >
        {tabList.map((tab, index) => (
          <AtTabsPane current={current} index={index}></AtTabsPane>
        ))}
      </AtTabs>
      <View style="margin-top:10rpx">
        <Images imageUrls={imageUrls} />
      </View>
    </>
  );
};
