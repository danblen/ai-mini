import { Image, Swiper, SwiperItem, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
export default ({ banners }) => {
  return (
    <View style={Styles.container}>
      <Swiper
        className="test-h"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
        style={Styles.Swiper}>
        {banners?.map?.(banner => (
          <SwiperItem>
            <Image
              style={Styles.image}
              className=" "
              mode="widthFix"
              onClick={() => {
                Taro.navigateTo({
                  url: '/pages/faceswap/index?imageUrl=' + banner,
                });
              }}
              src={banner}></Image>
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  );
};
const Styles = {
  Swiper: {
    height: '400rpx',
    width: '96%',
    borderRadius: '15rpx',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    borderRadius: '15rpx',
  },
};
