/**
 * 作品页
 */
import { Button, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React, { useState } from 'react';
import { getStorageSync, setStorageSync } from '../../base/global.js';
import FinishedTask from './FinishedTask.jsx';
import { fetchProcessedImages } from './fetchProcessedImages.js';

let lastPicCount = 0;
export default ({ images }) => {
  const [allImages, setAllImages] = useState([]);
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      userId: '',
      isChecked: false,
    },
  });
  const fetchData = async (refresh) => {
    const storageUserInfo = getStorageSync('userInfo');
    setUserInfo(storageUserInfo);
    let processedImages = getStorageSync('processedImages') || [];

    lastPicCount = processedImages.length;
    if (storageUserInfo?.isLogin && storageUserInfo.data?.userId) {
      const userInfo = {
        userId: storageUserInfo.data.userId,
        requestStatus: 'finishing',
      };
      console.log('refresh', processedImages.length, lastPicCount);

      // if (
      //   refresh === true ||
      //   processedImages.length === 0 ||
      //   processedImages.length === lastPicCount
      // ) {
      // 从缓存中未获取到数据，进行网络请求
      processedImages = await fetchProcessedImages(userInfo);

      if (processedImages?.length > 0) {
        processedImages.reverse();
      }
      lastPicCount = processedImages.length;
      // 将请求到的数据缓存到本地存储
      setStorageSync('processedImages', processedImages);
      // }
      // }

      setAllImages(processedImages);
    } else {
      // 用户未登录或获取用户信息失败时，清空数据
      setAllImages([]);
      // 清空本地存储中的数据
      Taro.removeStorageSync('processedImages');
    }
  };

  useDidShow(() => {
    fetchData();
  }, []);
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
        <View style={{}}>
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
            去登录
          </Button>
        </View>
      )}
    </View>
  );
};
