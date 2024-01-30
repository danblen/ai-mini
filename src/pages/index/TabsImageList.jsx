import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import React, { useState, useEffect, useCallback } from 'react';
// import Hot from "./hot/index.jsx";
// import New from "./new/index.jsx";
import Images from './Images.jsx';
// import { tags } from "../const/app.js";
import { getPhotoPath, URL_BACK, get_all_images } from '../../api/index.js';

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
    <View style={Styles.container}>
      <AtTabs
        current={current}
        tabList={tabList}
        swipeable={true}
        scroll
        onClick={onClick}
      >
        {tabList.map((tab, index) => (
          <AtTabsPane className="" current={current} index={index}></AtTabsPane>
        ))}
      </AtTabs>
      <View style=" ">
        <Images imageUrls={imageUrls} />
      </View>
    </View>
  );
};
const Styles = {
  container: {
    borderRadius: '10rpx',
    marginTop: '20rpx',
    background: 'linear-gradient(to top, #a5c3b6, #fbfbfb)',
    // background: "linear-gradient(to right, #27ae60, #2ecc71)",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    // padding: "5rpx",
  },
};
