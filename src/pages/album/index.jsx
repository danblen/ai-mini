/**
 * 作品页
 */
import { Button, View } from '@tarojs/components';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { api } from '../../api/index.js';
import FinishedTask from './FinishedTask.jsx';

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
  const fetchData = async () => {
    const storageUserInfo = Taro.getStorageSync('userInfo');
    setUserInfo(storageUserInfo);
    console.log(storageUserInfo);
    let processedImages = Taro.getStorageSync('processedImages') || [];

    console.log(processedImages);
    if (storageUserInfo?.isLogin && storageUserInfo.data?.user_id) {
      const userInfo = {
        userId: storageUserInfo.data.userId,
        requestStatus: 'finishing',
      };

      if (processedImages.length === 0) {
        // 从缓存中未获取到数据，进行网络请求
        processedImages = await api.getUserProcessImage(userInfo).catch();
        if (processedImages?.length > 0) {
          // 将请求到的数据缓存到本地存储
          Taro.setStorageSync('processedImages', processedImages);
        }
      }

      setAllImages(processedImages);
    } else {
      // 用户未登录或获取用户信息失败时，清空数据
      setAllImages([]);
      // 清空本地存储中的数据
      Taro.removeStorageSync('processedImages');
    }
  };

  useEffect(() => {
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
        <View
          style={{
            paddingTop: '20rpx',
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
