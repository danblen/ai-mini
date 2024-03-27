/**
 * 作品页
 */
import { Button, ScrollView, Text, View } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import React, { useState } from 'react';
import { AtFloatLayout } from 'taro-ui';
import { api } from '../../api/index.js';
import LoginView from '../comps/LoginView.jsx';
import FinishedTask from './FinishedTask.jsx';
import PendingTask from './PendingTask.jsx';

export default ({}) => {
  const [images, setImages] = useState({
    finishedImages: [],
    pendingImages: [],
  });
  const [current, setCurrent] = useState('已完成');

  const getImages = async () => {
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
  };
  const tabList = [
    {
      title: '已完成',
    },
    {
      title: '进行中',
    },
  ];
  useDidShow(() => {
    if (global.userInfo.isLogin) {
      getImages();
    } else {
      setImages({
        finishedImages: [],
        pendingImages: [],
      });
    }
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

      {global.userInfo.isLogin && (
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
      {!global.userInfo.isLogin && (
        <View style={{ alignItems: 'center', marginTop: 60 }}>
          <View style={{ fontSize: 18, textAlign: 'center' }}>
            您还未登陆，请先登陆
          </View>
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

      <AtFloatLayout isOpened={!global.userInfo.isLogin}>
        <LoginView
          onConfirmLogin={async (res) => {
            getImages();
          }}
        />
      </AtFloatLayout>
    </View>
  );
};
