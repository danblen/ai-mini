/**
 * @description 此组件用于展示用户动态相关的图片列表。该组件会从后端获取与用户动态相关的图片数据，然后以瀑布流的形式展示在页面上。
 * 输出：用户动态页面组件，包含以下内容：
 *   - 滚动视图组件（ScrollView）
 *   - 瀑布流图片列表组件（WaterfallList）
 *   - 左侧和右侧图片列表状态（leftHalf和rightHalf）
 *
 * 1、组件会在挂载时自动从后端获取热门标签相关的图片数据，
 * 2、如果获取成功，则将图片数组切割成左右两半，然后分别渲染到左侧和右侧的图片列表中
 * 3、如果之前已经获取过图片数据，则会直接使用缓存的数据进行渲染。
 * @returns {JSX.Element} - 返回一个包含用户动态相关图片列表的页面组件。
 * @example
 * // Example usage:
 * <New />
 */

import { ScrollView, View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import WaterfallList from '../../comps/WaterfallList.jsx';
import CustomTop from '../../comps/CustomTop.jsx';
import { getStorageSync, setStorageSync } from '../../../base/global.js';
import { api } from '../../../api/index.js';

let firstGetImages = 0;
export default ({ tagImages }) => {
  const [leftHalf, setLeftHalf] = useState();
  const [rightHalf, setRightHalf] = useState();

  const setLRHalfPic = async () => {
    if (!Array.isArray(tagImages)) {
      console.log('tagImages is not an array:', tagImages);
      return;
    }
    // 计算数组长度的一半
    const halfLength = Math.ceil(tagImages.length / 2 - 1);
    // 将原始数组切割成两半
    setLeftHalf(tagImages.slice(0, halfLength));
    setRightHalf(tagImages.slice(halfLength));
  };
  // const getTagImages = async () => {
  //   let res = await api.getTagImages({ tagName: 'Hot' });
  //   if (res?.data) {
  //     setStorageSync('tmpNewTagimages', res.data);
  //     setLRHalfPic(res.data);
  //   }
  // };
  // if (!firstGetImages) {
  //   firstGetImages = 1;
  //   getTagImages();
  // }
  useEffect(() => {
    setLRHalfPic();
    // const tmpHotTagimages = getStorageSync('tmpHotTagimages');
    // if (!tmpHotTagimages) {
    //   getTagImages();
    // } else {
    //   setLRHalfPic(tmpHotTagimages);
    // }
  }, [tagImages]);
  return (
    <ScrollView enhanced showScrollbar={false} scroll-y>
      <View style={{ marginTop: 10 }}></View>
      <WaterfallList
        imageListLeft={leftHalf || []}
        imageListRight={rightHalf || []}
        LeftTop={<CustomTop curTagPage="NEW" />}
      />
    </ScrollView>
  );
};
