/**
 * @description 此组件用于顶部展示活动标题和描述，并获取与该活动相关的图片数据（通过活动标题），然后以瀑布流的形式展示在页面上。
 * @param {string} title - 活动标题。需要在组件挂载时解码后调用服务器的API获取相对应的图片数据。
 * @param {string} description - 活动描述。
 * @returns {JSX.Element} - 返回一个包含活动标题、描述和图片列表的页面组件。
 * @example
 * // Example usage:
 * <Activity
 *    title="活动标题"
 *    description="活动描述内容"
 * />
 */
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { api } from '../../api/index.js';
import WaterfallList from '../comps/WaterfallList.jsx';
import CustomTop from '../comps/CustomTop.jsx';
import BackButton from '../comps/BackButton.jsx';

/**
 * 活动页面组件
 */
const ActivityPage = () => {
  // 从路由参数中获取活动标题和描述，并解码
  const { title, description } = Taro.getCurrentInstance().router.params;
  const decodedTitle = decodeURIComponent(title);
  const decodedDescription = decodeURIComponent(description);

  // 左侧和右侧图片列表的状态
  const [leftHalf, setLeftHalf] = useState();
  const [rightHalf, setRightHalf] = useState();
  // 将图片数组切割成左右两半，并设置状态
  const setLRHalfPic = async (originalImageArray) => {
    const halfLength = Math.ceil(originalImageArray.length / 2 - 1);
    setLeftHalf(originalImageArray.slice(0, halfLength));
    setRightHalf(originalImageArray.slice(halfLength));
  };

  // 获取所有图片数据
  const getTagNameImages = async () => {
    let res = await api.getImages([{ tagName: decodedTitle }]);
    if (res?.data) {
      setLRHalfPic(res.data[0]);
    }
  };

  useEffect(() => {
    // 组件挂载时获取图片数据
    getTagNameImages();
  }, []);

  return (
    <>
      <BackButton />
      <View>
        {/* 活动标题和描述区域 */}
        <View
          style={{
            background: '#0066ffa6',
            paddingTop: '50px',
            position: 'relative',
          }}
        >
          <View
            style={{
              padding: '20px',
              flexDirection: 'column',
              display: 'flex',
            }}
          >
            {/* 活动标题 */}
            <Text
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              {decodedTitle}
            </Text>
            {/* 活动描述 */}
            <Text style={{ color: '#252424' }}>{decodedDescription}</Text>
          </View>
        </View>
        {/* 图片列表区域 */}
        <View
          style={{
            marginTop: '10px',
            borderRadius: '50px',
          }}
        >
          {/* 瀑布流图片列表组件 */}
          <WaterfallList
            imageListLeft={leftHalf || []}
            imageListRight={rightHalf || []}
            LeftTop={<CustomTop curTagPage={decodedTitle} />}
          />
        </View>
      </View>
    </>
  );
};

export default ActivityPage;
