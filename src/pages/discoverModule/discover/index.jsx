/**
 * 发现页
 */

import { View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import Hot from './Hot';
import NavBar from './NavBar';
import New from './New';
import Recommend from './Recommend';

export default () => {
  const [currentTab, setCurrentTab] = useState('recommend');
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
  }, []);
  return (
    <View>
      <NavBar
        currentTab={currentTab}
        onSwitchTab={(tabName) => {
          setCurrentTab(tabName);
        }}
      ></NavBar>

      {currentTab === 'recommend' && (
        <Recommend tags_image={allImages?.tagsImage} />
      )}
      {currentTab === 'hot' && <Hot />}
      {currentTab === 'new' && <New />}
    </View>
  );
};
const Style = {};
