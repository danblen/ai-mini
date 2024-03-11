/**
 * 首页
 */

import { ScrollView, View } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { get_all_images } from '../../api';
import {
  updateUserInfoFromStorage,
  updateUserTokenFromStorage,
} from '../../common/user';
import NavBar from './NavBar';
import { api } from '../../api/index.js';

const Hot = lazy(() => import('./Hot'));
const Recommend = lazy(() => import('./Recommend'));
const New = lazy(() => import('./New'));

function TabContent({
  currentTab,
  allImages,
  tagImages,
  navigateToTab,
  recomTitle,
}) {
  const tabComponents = {
    hot: <Hot onNavigateToTab={navigateToTab} />,
    recommend: (
      <Recommend
        tags_image={allImages?.tagsImage}
        onNavigateToTab={navigateToTab}
        titleParam={recomTitle}
      />
    ),
    new: <New tagImages={tagImages} />,
  };
  const TabComponent = tabComponents[currentTab];

  return <Suspense fallback={<View>Loading...</View>}>{TabComponent}</Suspense>;
}
export default () => {
  const [currentTab, setCurrentTab] = useState('hot');
  const [recomTitle, setRecomTitle] = useState('古装');
  // 获取推荐tab页的图片，需要优化
  let [allImages, setAllImages] = useState({ albums: {}, tagsImage: {} });
  let [tagImages, setTagImages] = useState([]);
  const getAllImages = async () => {
    let res = await get_all_images();
    if (res?.data) {
      const shuffledData = {};
      for (const key in res.data.tagsImage) {
        if (res.data.tagsImage.hasOwnProperty(key)) {
          const shuffledIndexes = res.data.tagsImage[key].sort(
            () => Math.random() - 0.5
          );
          shuffledData[key] = shuffledIndexes;
        }
      }

      // 对 "abc" 进行随机排序
      const shuffledKeys = Object.keys(shuffledData).sort(
        () => Math.random() - 0.5
      );
      const shuffledImageData = {};
      for (const key of shuffledKeys) {
        shuffledImageData[key] = shuffledData[key];
      }

      res.data.tagsImage = shuffledImageData;
      setAllImages(res.data);
    }
  };
  const getTagImages = async () => {
    let res = await api.getTagImages({ tagName: 'NEW' });
    if (res?.data) {
      // 过滤掉值为 null 的元素
      const filteredData = res.data.filter((item) => item !== null);
      if (filteredData.length > 0) {
        const shuffledImages = filteredData.sort(() => Math.random() - 0.5);
        setTagImages(shuffledImages);
        // setStorageSync('tmpNewTagimages', res.data);
        // setLRHalfPic(res.data);
      }
    }
  };
  useEffect(() => {
    getAllImages();
    getTagImages();
    updateUserInfoFromStorage();
    updateUserTokenFromStorage();
  }, []);
  usePullDownRefresh(() => {
    //调用Taro.stopPullDownRefresh 停止下拉效果
    getAllImages().then(() => Taro.stopPullDownRefresh());
    getTagImages().then(() => Taro.stopPullDownRefresh());
  });

  return (
    <ScrollView
      enhanced
      showScrollbar={false}
      scroll-y
      style={{
        marginTop: '10px',
      }}
    >
      <NavBar
        currentTab={currentTab}
        onSwitchTab={(tabName) => {
          setCurrentTab(tabName);
        }}
      ></NavBar>
      <ScrollView
        scroll-y
        enhanced
        showScrollbar={false}
        style={{ marginTop: 90 }}
      >
        <TabContent
          currentTab={currentTab}
          allImages={allImages}
          tagImages={tagImages}
          navigateToTab={(param, title) => {
            setCurrentTab(param);
            setRecomTitle(title);
          }}
          recomTitle={recomTitle}
        />
      </ScrollView>
    </ScrollView>
  );
};
const Style = {};
