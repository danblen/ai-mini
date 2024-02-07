/**
 * 作品页
 */
import { Button, View } from '@tarojs/components';
import React, { useEffect } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { useState } from 'react';
import FinishedTask from '../album/FinishedTask.jsx';
import { api } from '../../api/index.js';

export default ({ images }) => {
  const [allImages, setAllImages] = useState([]);
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      user_id: '',
      is_check: false,
    },
  });

  const fetchData = async () => {
    const storageUserInfo = getStorageSync('userInfo');
    setUserInfo(storageUserInfo);
    if (storageUserInfo?.isLogin && storageUserInfo.data?.userId) {
      const userInfo = {
        userId: storageUserInfo.data.userId,
        request_status: 'finishing',
      };
      const processedImages = await api.getUserProcessImage(userInfo).catch();
      console.log('processedImages', processedImages);
      if (processedImages?.data) {
        let allImages = processedImages.data.map((image) => ({
          url: image.outputImagePath,
        }));
        setAllImages(allImages);
      }
      // if (processedImages?.length > 0) {
      // }
    } else {
      setAllImages([]);
    }
  };
  useDidShow(() => {
    fetchData();
  });
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <View>
      {userInfo.isLogin ? (
        <View
          style={{
            marginTop: '10rpx',
          }}
        >
          <FinishedTask images={allImages} onFetchData={fetchData} />
        </View>
      ) : (
        <View
          style={{
            paddingTop: '300rpx',
          }}
        >
          <View
            style={{
              textAlign: 'center',
              fontSize: '40rpx',
            }}
          >
            您还未登陆，请先登陆
          </View>
          <Button
            type="primary"
            style={{
              position: 'relative',
              width: '40%',
              animation: 'swap 1s infinite',
            }}
            onClick={() => {
              Taro.switchTab({
                url: '/pages/user/index',
              });
            }}
          >
            去登陆
          </Button>
        </View>
      )}
    </View>
  );
};
