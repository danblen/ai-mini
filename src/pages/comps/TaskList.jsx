import { View, ScrollView, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState, useEffect, useRef } from 'react';
import { AtIcon } from 'taro-ui';

export default ({ images }) => {
  const timersRef = useRef({});
  useEffect(() => {
    return () => {
      Object.keys(timersRef.current).forEach((key) => {
        clearInterval(timersRef.current[key]);
      });
    };
  }, []);
  return (
    <View
      style={{
        background: 'black',
        height: '100vh',
        color: '#fff',
        paddingTop: 40,
      }}
    >
      <View
        style={{
          background: 'black',
          paddingTop: '20rpx',
          marginBottom: '20rpx',
          marginLeft: '15rpx',
        }}
        onClick={() => {
          Taro.reLaunch({
            url: '/pages/album/index',
          });
        }}
      >
        作品集
        <AtIcon value="chevron-right" size="22" />
      </View>

      <ScrollView style={{ background: 'black' }}>
        {images?.map((image, index) => (
          <View
            key={index}
            style={{
              display: 'inline-block',
            }}
          >
            {image.status === 'pending' ? (
              <View
                style={{
                  marginLeft: '15rpx',
                }}
              >
                {/* <Loading /> */}
                <View>制作中</View>
              </View>
            ) : (
              <Image
                style={{
                  width: '280rpx',
                  marginLeft: '15rpx',
                  borderRadius: '10rpx',
                }}
                src={image.src}
                mode="widthFix"
                onClick={() => {
                  Taro.previewImage({
                    current: image.src,
                    urls: images.map((image) => image.src),
                  });
                }}
              />
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
