import { ScrollView, Text, View, Image } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import WaterfallList from '../../comps/WaterfallList.jsx';
import TitleView from '../Hot/TitleView.jsx';
import CustomTop from '../../comps/CustomTop.jsx';
import { getStorageSync, setStorageSync } from '../../../base/global.js';
import { api, get_all_images } from '../../../api/index.js';

let firstGetImages = 0;
export default () => {
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
  const [leftHalf, setLeftHalf] = useState();
  const [rightHalf, setRightHalf] = useState();
  const setLRHalfPic = async (originalImageArray) => {
    // 计算数组长度的一半
    const halfLength = Math.ceil(originalImageArray.length / 2 - 1);
    // 将原始数组切割成两半
    setLeftHalf(originalImageArray.slice(0, halfLength));
    setRightHalf(originalImageArray.slice(halfLength));
  };
  const getAllImages = async () => {
    let res = await get_all_images();
    if (res?.data) {
      setAllImages(res.data);
      setStorageSync('tmpAllimages', res.data);
    }
  };
  const getTagImages = async () => {
    let res = await api.getTagImages({ tagName: 'Hot' });
    if (res?.data) {
      setStorageSync('tmpHotTagimages', res.data);
      setLRHalfPic(res.data);
    }
  };
  if (!firstGetImages) {
    firstGetImages = 1;
    getAllImages();
    getTagImages();
  }
  useEffect(() => {
    const tmpAllimages = getStorageSync('tmpAllimages');
    if (!tmpAllimages) {
      getAllImages();
    } else {
      setAllImages(tmpAllimages);
    }
    const tmpHotTagimages = getStorageSync('tmpHotTagimages');
    if (!tmpHotTagimages) {
      getTagImages();
    } else {
      setLRHalfPic(tmpHotTagimages);
    }
    // const timer = setInterval(() => {
    //   getAllImages();
    //   getTagImages();
    // }, 1 * 60 * 1000); // 1分钟
  }, []);
  return (
    <ScrollView enhanced showScrollbar={false} scroll-y>
      {/* <View
        style={{
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      > */}
      {/* <Text>敬请期待</Text> */}

      <WaterfallList
        imageListLeft={leftHalf || []}
        imageListRight={rightHalf || []}
        LeftTop={<CustomTop curTagPage="Hot" />}
      />
      {/* </View> */}
    </ScrollView>
  );
};
