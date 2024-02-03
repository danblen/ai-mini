/**
 * 作品页
 */
import { Button, View } from '@tarojs/components';
import Taro, { useDidShow, useUnload } from '@tarojs/taro';
import { useState } from 'react';
import FinishedTask from './FinishedTask.jsx';
import { fetchProcessedImages } from './fetchProcessedImages.js';
import { api } from '../../api/index.js';

export default () => {
  const [allImages, setAllImages] = useState([]);
  const [interval, setIntervalVlu] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      userId: '',
      isChecked: false,
    },
  });

  const fetchData = async () => {
    const storageUserInfo = getStorageSync('userInfo');
    setUserInfo(storageUserInfo);
    if (storageUserInfo?.isLogin && storageUserInfo.data?.userId) {
      const userInfo = {
        userId: storageUserInfo.data.userId,
        requestStatus: 'finishing',
      };

      const processedImages = await api.getUserProcessImage(userInfo).catch();
      // if (processedImages?.length > 0) {
      if (processedImages) {
        let allImages = processedImages.data.map((image) => ({
          url: 'data:image/png;base64,' + image.outputImagePath,
        }));
        setAllImages(allImages);
      }
      // }
    } else {
      setAllImages([]);
    }
  };

  useDidShow(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    setIntervalVlu(interval);
  });
  // useUnload 钩子，在页面隐藏时执行
  useUnload(() => {
    clearInterval(interval);
  });
  return (
    <View>
      {userInfo.isLogin ? (
        <View
          style={{
            marginTop: '10rpx',
          }}
        >
          <FinishedTask images={allImages} />
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
