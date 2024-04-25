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

export default ({}) => {
  const [leftHalf, setLeftHalf] = useState();
  const [rightHalf, setRightHalf] = useState();
  const getTagImages = async () => {
    let res = await api.getImages([{ tagName: 'NEW' }]);
    if (res?.data) {
      // 过滤掉值为 null 的元素
      const filteredData = res.data[0].filter((item) => item !== null);
      if (filteredData.length > 0) {
        const shuffledImages = filteredData.sort(() => Math.random() - 0.5);
        setHalfPic(shuffledImages);
      }
    }
  };
  useEffect(() => {
    getTagImages();
  }, []);
  const setHalfPic = async (tagImages) => {
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
