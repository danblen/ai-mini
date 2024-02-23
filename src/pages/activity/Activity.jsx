import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import CustomNavBar from '../index/CustomNavBar.jsx';
import { getPhotoPath, URL_BACK, get_all_images } from '../../api/index.js';
import React, { useState, useEffect, useRef } from 'react';
import TabsImageList from '../index/TabsImageList';
import WaterfallList from '../index/WaterfallList';

const ActivityPage = () => {
  const { title, description } = Taro.getCurrentInstance().router.params;
  const decodedTitle = decodeURIComponent(title);
  const decodedDescription = decodeURIComponent(description);
  const [leftHalf, setLeftHalf] = useState();
  const [rightHalf, setRightHalf] = useState();
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
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
      setLRHalfPic(res.data?.activityTagsImage?.[decodedTitle]);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <>
      <CustomNavBar></CustomNavBar>
      <View>
        <View
          style={{
            background: '#0066ffa6',
            paddingTop: '50px',
            position: 'relative',
            // height: "100vh",
          }}
        >
          {/* 上半部分：真实标题和文案 */}
          <View
            style={{
              padding: '20px',
              flexDirection: 'column',
              display: 'flex',
            }}
          >
            <Text
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
            >
              {decodedTitle}
            </Text>
            <Text style={{ color: '#666' }}>{decodedDescription}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: '10px',
            borderRadius: '50px',
          }}
        >
          <WaterfallList
            imageListLeft={leftHalf || []}
            imageListRight={rightHalf || []}
            curTagPage={decodedTitle}
          />
          {/* <TabsImageList tags_image={allImages?.activityTagsImage} /> */}
        </View>
      </View>
    </>
  );
};

export default ActivityPage;
const Styles = {
  container: {
    borderRadius: '10rpx',
    background: '#f567028a',
    // background: "linear-gradient(to right, #79bfa0, #6c9a85)",
    margin: '20rpx',
    marginTop: '20rpx',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};
