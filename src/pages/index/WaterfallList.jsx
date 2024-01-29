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
            <View
              style={{
                backgroundColor: '#fff',
                marginBottom: 10,
                borderRadius: 5,
              }}>
              <Image
                src={item}
                lazyLoad
                style={{
                  width: '100%',
                  marginBottom: '10rpx',
                  borderRadius: 5,
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
            <View
              style={{
                backgroundColor: '#fff',
                marginBottom: 10,
                borderRadius: 5,
              }}>
              <Image
                lazyLoad
                src={item}
                style={{
                  width: '100%',
                  marginBottom: '10rpx',
                  borderRadius: 5,
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
