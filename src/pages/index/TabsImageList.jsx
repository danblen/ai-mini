import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import React, { useState, useEffect, useCallback } from "react";
// import Hot from "./hot/index.jsx";
// import New from "./new/index.jsx";
import Images from "./Images.jsx";
// import { tags } from "../const/app.js";
import { getPhotoPath, URL_BACK, get_all_images } from "../../api/index.js";

export default ({ tags_image }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [tabList, setTabList] = useState([]);
  const [current, setCurrent] = useState(0);
  const onClick = useCallback(
    (value) => {
      setCurrent(value);
      setImageUrls(tags_image[tabList[value].title]);
    },
    [tabList]
  );
  useEffect(() => {
    if (tags_image) {
      const tabs = Object.keys(tags_image).map((key) => ({ title: key }));
      setTabList(tabs);
      setImageUrls(tags_image[tabs[0]?.title]);
    }
  }, [tags_image]);
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
      <View style=" ">
        <Images imageUrls={imageUrls} />
      </View>
    </>
  );
};
