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
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '200rpx',
    borderRadius: 5,
  },
};
