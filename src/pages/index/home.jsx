import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  Button,
  Swiper,
  SwiperItem,
  Text,
} from '@tarojs/components';
import Taro from '@tarojs/taro';

const Home = () => {
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [showPopup, setShowPopup] = useState(false);
  // const [imagesSlide, setImagesSlide] = useState(type_pic);
  // const [imagesSwiper, setImagesSwiper] = useState(imageUrl_cover);
  // const [currentTab, setCurrentTab] = useState(0);
  // const [maxBackgroundColor, setMaxBackgroundColor] = useState("#232824");
  // const [cardBackgroundColor, setCardBackgroundColor] = useState("#85afa3");

  // const handleSwiperChange = (e) => {
  //   setCurrentImageIndex(e.detail.current);
  // };

  // const handleTabChange = (index) => {
  //   setCurrentTab(index);
  //   if (index) {
  //     setImagesSlide(type_pic1);
  //   }
  // };

  // const navigateTo = (url, src) => {
  //   navigateTo({
  //     url: url + "?src=" + src,
  //   });
  // };
  return (
    <View style={{ marginTop: '10px' }}>
      {/* <View
        style={{
          position: 'fixed',
          width: '60rpx',
          height: '60rpx',
          left: '50rpx',
          top: '100rpx',
          zIndex: 2,
        }}
        onClick={() => setShowPopup(true)}
      >
      </View>
      {showPopup && (
        <View style={{ padding: '10px', width: '200px' }}>
        </View>
      )} */}
      <Image
        mode="aspectFill"
        src="https://danblen.github.io/static/index.jpg"
        onClick={() => {
          navigateTo({
            url: '/pages/faceswap/index?imageUrl=https://danblen.github.io/static/index.jpg',
          });
        }}
      ></Image>
      {/* <Image
        style={{
          objectFit: 'cover',
          width: '95%',
          height: '300px',
          marginTop: '32px',
          borderRadius: '14px',
          marginBottom: '20px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
        mode="aspectFill"
        onClick={() => navigateTo('/pages/faceswap/index', imagesSwiper[currentImageIndex])}
      /> */}
      {/* <Swiper
        indicatorDots
        autoplay
        interval={3000}
        circular
        style={{ height: '330px' }}
        onChange={handleSwiperChange}
      >
      </Swiper>

      <View style={{ ...styles.cardStyle, background: cardBackgroundColor }}>
      </View>

      <View style={{ ...styles.cardStyle, background: cardBackgroundColor }}>
      </View>

      <Button
        className="swap"
        type="primary"
        style={{
          position: 'fixed',
          bottom: '40rpx',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          opacity: 0.8,
          fontWeight: 'bold',
        }}
        onClick={() => navigateTo('/pages/faceswap/index', imagesSwiper[currentImageIndex])}
      >
        开始制作
      </Button> */}
    </View>
  );
};

const styles = {
  cardStyle: {
    borderRadius: '8px',
    marginTop: '5px',
    marginBottom: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    border: '5px solid',
  },
};

export default Home;
