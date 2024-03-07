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
    // 通过这种判断来确定接口调用成功与否
    if (res?.data) {
      setAllImages(res.data);
    }
  };

  const getTagImages = async () => {
    let res = await api.getTagImages({ tagName: 'Hot' });
    if (res?.data) {
      setTagImages(res.data);
      // setStorageSync('tmpNewTagimages', res.data);
      // setLRHalfPic(res.data);
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
