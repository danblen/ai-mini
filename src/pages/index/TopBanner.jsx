import { Image, Swiper, SwiperItem, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
export default ({ banners }) => {
  return (
    <View style={Styles.container}>
      <Swiper circular indicatorDots autoplay style={Styles.Swiper}>
        {banners?.map?.((banner) => (
          <SwiperItem>
            <Image
              style={Styles.image}
              className=" "
              mode="widthFix"
              onClick={() => {
                navigateTo({
                  url: '/pages/faceswap/index?imageUrl=' + banner.imageUrl,
                });
              }}
              src={banner.imageUrl}
            ></Image>
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
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '200rpx',
    borderRadius: 5,
  },
};
