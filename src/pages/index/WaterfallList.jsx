import { Image, View } from '@tarojs/components';
import React from 'react';

export default ({ imageListLeft, imageListRight }) => {
  return (
    <View style={{ display: 'flex', justifyContent: 'center' }}>
      <View
        style={{
          width: '96%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: '49%',
          }}>
          {imageListLeft?.map((item, index) => (
            <View>
              <Image
                src={item}
                lazyLoad
                style={{
                  width: '100%',
                  marginBottom: '10rpx',
                  borderRadius: '15rpx',
                }}
              />
              desc
            </View>
          ))}
        </View>
        <View
          style={{
            width: '49%',
          }}>
          {imageListRight?.map((item, index) => (
            <Image
              lazyLoad
              src={item}
              style={{
                width: '100%',
                marginBottom: '10rpx',
                borderRadius: '15rpx',
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};
