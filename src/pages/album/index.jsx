/**
 * 作品页
 */
import { Button, ScrollView, Text, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React, { useState } from 'react';
import { getStorageSync, setStorageSync } from '../../base/global.js';
import FinishedTask from './FinishedTask.jsx';
import { fetchProcessedImages } from './fetchProcessedImages.js';
import { api } from '../../api/index.js';
import { AtFloatLayout } from 'taro-ui';
import LoginView from '../comps/LoginView.jsx';
import { updateUserInfoFromStorage } from '../../common/user.js';
import PendingTask from './PendingTask.jsx';

let lastPicCount = 0;
export default ({}) => {
  const [allImages, setAllImages] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [images, setImages] = useState({
    finishedImages: [],
    pendingImages: [],
  });
  const [userInfo, setUserInfo] = useState(global.userInfo);
  const [current, setCurrent] = useState('已完成');
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

  const getImages = async () => {
    if (global.userInfo.isLogin) {
      let res = await api.getUserProcessImage({
        userId: global.userInfo.data.userId,
      });
      if (res?.data) {
        let data = res.data;
        data.finishedImages = data.finishedImages.map((item) => ({
          ...item,
          url: item.outputImagePath,
        }));
        setImages(data);
      }
    } else {
      setIsOpened(true);
    }
  };
  const tabList = [
    {
      title: '已完成',
    },
    {
      title: '进行中',
    },
  ];
  const updateUserInfo = async () => {
    await updateUserInfoFromStorage();
    setUserInfo(global.userInfo);
  };
  useDidShow(() => {
    updateUserInfo();
    // fetchData();
    getImages();
  }, []);
  return (
    <View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          height: 40,
          top: 0,
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          backgroundColor: 'white',
          zIndex: '5',
        }}
      >
        <ScrollView
          scrollX
          style={{
            width: '90%',
            whiteSpace: 'nowrap',
          }}
        >
          {tabList?.map((tab) => (
            <View
              style={{
                fontSize: 12,
                display: 'inline-block',
                backgroundColor: current === tab.title ? '#59a2dc' : '#fff',
                marginLeft: 8,
                paddingLeft: 8,
                paddingRight: 8,
                borderRadius: 20,
                lineHeight: '50rpx',
              }}
              onClick={() => {
                getImages();
                setCurrent(tab.title);
              }}
            >
              {tab.title}
            </View>
          ))}
        </ScrollView>
      </View>

      {userInfo.isLogin && (
        <View>
          {current === '已完成' && (
            <FinishedTask
              images={images?.finishedImages}
              onFetchData={getImages}
            />
          )}
          {current === '进行中' && (
            <PendingTask
              images={images?.pendingImages}
              onFetchData={getImages}
            />
          )}
        </View>
      )}
      {!userInfo.isLogin && (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <Text style={{ fontSize: 18, textAlign: 'center' }}>
            您还未登陆，请先登陆
          </Text>
          <Button
            type="primary"
            style={{
              marginTop: 20,
              width: '40%',
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

      {/* <AtFloatLayout
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <LoginView
          onConfirmLogin={async (res) => {
            setIsOpened(false);
          }}
        />
      </AtFloatLayout> */}
    </View>
  );
};
