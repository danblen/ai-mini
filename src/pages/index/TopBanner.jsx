import { Image, Swiper, SwiperItem, View } from '@tarojs/components';

export default ({ banners }) => {
  return (
    <View style={Styles.container}>
      <Swiper circular indicatorDots autoplay style={Styles.Swiper}>
        {banners?.map?.((banner, index) => (
          <SwiperItem key={index}>
            <Image
              style={Styles.image}
              className=" "
              mode="widthFix"
              // onClick={() => {
              //   navigateTo({
              //     url: '/pages/faceswap/index?imageUrl=' + url,
              //   });
              // }}
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
    // backgroundImage: 'linear-gradient(to right, #67B26F, #4ca2cd)', // 添加渐变背景
  },
  image: {
    width: '100%',
    height: '200rpx',
    borderRadius: 5,
  },
};
