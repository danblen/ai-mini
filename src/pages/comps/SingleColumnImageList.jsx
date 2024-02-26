import { Image, Text, View } from '@tarojs/components';
import React from 'react';
import { AtIcon } from 'taro-ui';
import ImageCard from './ImageCard';

export default ({ imageUrls }) => {
  const getRandomImage = () => {
    if (!imageUrls || imageUrls.length === 0) {
      return ''; // 如果图片列表为空，返回空字符串或其他默认值
    }
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImage = imageUrls[randomIndex].momentPics;
    return randomImage;
  };
  return (
    <View>
      <View>
        {imageUrls?.map?.((image, index) => {
          // Extracting file name from the URL
          // const fileNameWithoutExtension = src.substring(
          //   src.lastIndexOf('/') + 1,
          //   src.lastIndexOf('.')
          // );
          // Generating a random number between 1 and 10000 for heat value
          const randomHeatValue = Math.floor(Math.random() * 500) + 1;

          return <ImageCard image={image} />;
        })}
      </View>
    </View>
  );
};
