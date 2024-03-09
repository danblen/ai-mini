import { View } from '@tarojs/components';
import React from 'react';
import SingleColumnImageList from './SingleColumnImageList';
const PostNodePages = '/pages/postNode/index';

export default ({ imageListLeft, imageListRight, LeftTop, RightTop }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <View
        style={{
          width: '96%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: '49%',
          }}
        >
          {LeftTop}
          <SingleColumnImageList imageUrls={imageListLeft} />
        </View>
        <View
          style={{
            width: '49%',
          }}
        >
          {RightTop}
          <SingleColumnImageList imageUrls={imageListRight} />
        </View>
      </View>
    </View>
  );
};
