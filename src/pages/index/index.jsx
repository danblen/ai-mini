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

const Hot = lazy(() => import('./Hot'));
const Recommend = lazy(() => import('./Recommend'));
const New = lazy(() => import('./New'));

function TabContent({ currentTab, allImages, navigateToHot }) {
  const tabComponents = {
    hot: <Hot />,
    recommend: (
      <Recommend
        tags_image={allImages?.tagsImage}
        onNavigateToHot={navigateToHot}
      />
    ),
    new: <New />,
  };
  const TabComponent = tabComponents[currentTab];

  return <Suspense fallback={<View>Loading...</View>}>{TabComponent}</Suspense>;
}
export default () => {
  const [currentTab, setCurrentTab] = useState('hot');
  // 获取推荐tab页的图片，需要优化
  let [allImages, setAllImages] = useState({ albums: {}, tagsImage: {} });
  const getAllImages = async () => {
    let res = await get_all_images();
    // 通过这种判断来确定接口调用成功与否
    if (res?.data) {
      setAllImages(res.data);
    }
  };
  useEffect(() => {
    getAllImages();
    updateUserInfoFromStorage();
    updateUserTokenFromStorage();
  }, []);
  usePullDownRefresh(() => {
    //调用Taro.stopPullDownRefresh 停止下拉效果
    getAllImages().then(() => Taro.stopPullDownRefresh());
  });

  return (
    <ScrollView enhanced showScrollbar={false} scroll-y>
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
          navigateToHot={() => setCurrentTab('hot')}
        />
      </ScrollView>
    </ScrollView>
  );
};
const Style = {};
