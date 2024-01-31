import { Image, View, Text } from '@tarojs/components';
import React from 'react';
import compareIcon from '../../static/image/my/go.png';
import ImageList from '../discover/Recommend/ImageList';
import Taro, { useState, useEffect } from '@tarojs/taro';
const PostNodePages = '/pages/album/postNode';

export default ({ imageListLeft, imageListRight }) => {
  const navigateToPostNodePages = (selectedImages) => {
    console.log(selectedImages);
    Taro.navigateTo({
      url: `${PostNodePages}?images=${JSON.stringify(selectedImages)}`, // 使用变量构建路径
    });
  };

  const handleChooseImage = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
      });

      const selectedImages = res.tempFilePaths;

      // 调用函数，将选择的图片传递给 postnodepages 页面
      navigateToPostNodePages(selectedImages);
    } catch (error) {
      console.error('选择图片失败:', error);
    }
  };
  return (
    <View style={{ display: 'flex', justifyContent: 'center' }}>
      <View
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: '49%',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                position: 'relative',
                height: '150px',
                marginBottom: '20px',
              }}
              onClick={handleChooseImage}
            >
              {/* Background image for "每日打卡" */}
              <Image
                src={compareIcon}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: 5,
                  objectFit: 'cover',
                }}
              />
              <Text
                style={{
                  flex: 1,
                  marginBottom: '5px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2, // 控制显示行数
                  color: '#334561',
                  fontSize: '26px',
                  zIndex: 1,
                  position: 'relative',
                  top: '60px',
                  left: '50px',
                }}
              >
                发布模板
              </Text>
            </View>
            <ImageList imageUrls={imageListLeft} />
          </View>
        </View>
        <View
          style={{
            width: '50%',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              marginBottom: 10,
              borderRadius: 5,
            }}
          >
            <ImageList imageUrls={imageListRight} />
          </View>
        </View>
      </View>
    </View>
  );
};
