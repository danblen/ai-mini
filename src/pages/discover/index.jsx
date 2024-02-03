/**
 * 发现页
 */

import { View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import { get_all_images } from '../../api';
import Hot from './Hot';
import NavBar from './NavBar';
import New from './New';
import Recommend from './Recommend';

export default ({}) => {
  const [currentTab, setCurrentTab] = useState('recommend');
  let [allImages, setAllImages] = useState({ albums: {}, tagsImage: {} });
  const getAllImages = async () => {
    let res = await get_all_images();
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
