import { View, Text, Image } from '@tarojs/components';
import React from 'react';
import { AtIcon } from 'taro-ui';
import Taro from '@tarojs/taro';

export default ({ imageUrls }) => {
  return (
    <View style={Styles.container}>
      <View className="" style={Styles.imageList}>
        {imageUrls?.map?.((src, index) => (
          <View key={index} className="" style={Styles.imageWrap}>
            <Image
              style={Styles.image}
              mode="aspectFill"
              lazyLoad={true}
              className=" "
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/faceswap/index?imageUrl=' + src,
                });
              }}
              src={src}></Image>

            <View className="heat-info" style={Styles.heatInfo}>
              <View
                className="at-icon at-icon-eye"
                style={{
                  size: '20px',
                  color: '#d6d6d6',
                }}></View>
              <Text
                style={{
                  marginLeft: '8px',
                  color: '#e2e1e1',
                  fontSize: '14px',
                }}
                className="heat-value">
                233
              </Text>
            </View>

            <Text className="ellipsis" style={Styles.text}>
              坟头草两米高
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const Styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  imageList: {
    display: 'flex',
    width: '96%',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrap: {
    width: '49%',
  },
  image: {
    width: '100%',
    borderRadius: '10rpx',
  },
  heatInfo: {
    position: 'relative',
    top: '-30px',
    right: '-110px',
    borderRadius: '10%',
    backgroundColor: 'rgba(2, 0, 0, 0.08)',
    width: '68px',
    textAlign: 'center',
  },
  text: {
    flex: 1,
    marginTop: '-17px',
    marginBottom: '5px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2, // 控制显示行数
    color: '#868686',
  },
};
