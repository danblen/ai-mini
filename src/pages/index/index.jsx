/**
 * 首页
 */

import { ScrollView } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { get_all_images } from '../../api';
import { updateUserInfoFromStorage } from '../../common/user';
import Hot from './Hot';
import NavBar from './NavBar';
import New from './New';
import Recommend from './Recommend';

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
  }, []);
  const navigateToHot = () => {
    setCurrentTab('hot');
  };
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
        {currentTab === 'hot' && <Hot />}
        {currentTab === 'recommend' && (
          <Recommend
            tags_image={allImages?.tagsImage}
            onNavigateToHot={navigateToHot}
          />
        )}
        {currentTab === 'new' && <New />}
      </ScrollView>
    </ScrollView>
  );
};
const Style = {};
