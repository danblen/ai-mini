import {
  Swiper
} from "@nutui/nutui-react-taro";
import { Image } from "@tarojs/components";
import React, { useEffect, useRef, useState } from "react";
const darkTheme = {
  nutuiGridItemContentPadding: "0px"
};
const App = () => {
  const swiperRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 自动切换逻辑
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const images = [
    "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
    "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
    "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
    "https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
  ];
  return (
    <>
      <Swiper defaultValue={0} indicator>
        {images.map((imageUrl, index) => (
          <Swiper.Item key={index}>
            <Image style={{width:'100%',height:'100%'}} src={imageUrl} alt="" />
          </Swiper.Item>
        ))}
      </Swiper>
    </>
  );
};
export default App;
