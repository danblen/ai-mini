/**
 * 发现页
 */

import { View } from '@tarojs/components';
import React, { useCallback, useEffect, useState } from 'react';
import Buttons from '../comps/Buttons';
import NavBar from './NavBar';
import Hot from './Hot';
import New from './New';
import Recommend from './Recommend';
import { get_all_images } from '../../api';

export default ({}) => {
  const [currentTab, setCurrentTab] = useState('recommend');
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
  const getAllImages = async () => {
    let allImages = await get_all_images();
    if (allImages) {
      setAllImages(allImages);
    }
  };
  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <View>
      <NavBar
        currentTab={currentTab}
        onSwitchTab={tabName => {
          setCurrentTab(tabName);
        }}></NavBar>

      {currentTab === 'recommend' && (
        <Recommend tags_image={allImages?.tags_image} />
      )}
      {currentTab === 'hot' && <Hot />}
      {currentTab === 'new' && <New />}
    </View>
  );
};
const Style = {};
