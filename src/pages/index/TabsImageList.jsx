import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import React, { useState, useEffect, useCallback } from "react";
// import Hot from "./hot/index.jsx";
// import New from "./new/index.jsx";
import Images from "./Images.jsx";
// import { tags } from "../const/app.js";
import { getPhotoPath, URL_BACK, get_all_images } from "../../api/index.js";

export default ({ tagsImage }) => {
  debugger;
  const [imageUrls, setImageUrls] = useState([]);
  const [tabList, setTabList] = useState([]);
  const [current, setCurrent] = useState(0);
  const onClick = useCallback(
    (value) => {
      setCurrent(value);
      setImageUrls(tagsImage[tabList[value].title]);
    },
    [tabList]
  );
  useEffect(() => {
    if (tagsImage) {
      const tabs = Object.keys(tagsImage).map((key) => ({ title: key }));
      setTabList(tabs);
      setImageUrls(tagsImage[tabs[0]?.title]);
    }
  }, [tagsImage]);
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
