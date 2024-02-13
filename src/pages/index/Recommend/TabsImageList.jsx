import { ScrollView, Text, View } from '@tarojs/components';
import React, { useEffect, useState, useRef } from 'react';
import { AtFloatLayout } from 'taro-ui';
import ImageList from './ImageList';
const HotPages = '/pages/index/Hot/index';

export default ({ tags_image, onNavigateToHot }) => {
  const [imageUrlsMap, setImageUrlsMap] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [tabList, setTabList] = useState([]);
  const [current, setCurrent] = useState('古装');
  const [showDrawer, setShowDrawer] = useState(false);
  const startXRef = useRef(0);
  const endXRef = useRef(0);
  const startYRef = useRef(0);
  const endYRef = useRef(0);

  useEffect(() => {
    if (tags_image) {
      const tabList = Object.keys(tags_image).map((key) => ({ title: key }));
      setTabList(tabList);
      const initialTab = tabList[0]?.title || '';
      setCurrent(initialTab);
      if (!imageUrlsMap[initialTab]) {
        setImageUrlsMap({
          ...imageUrlsMap,
          [initialTab]: tags_image[initialTab],
        });
      }
    }
  }, [tags_image]);

  const handleTabClick = (tabTitle) => {
    setCurrent(tabTitle);
    if (!imageUrlsMap[tabTitle]) {
      setImageUrlsMap({ ...imageUrlsMap, [tabTitle]: tags_image[tabTitle] });
    }
  };
  return (
    <View style={Styles.container}>
      <View
        style={{
          width: '100%',
          padding: '20rpx',
          display: 'flex',
          position: 'fixed',
          backgroundColor: 'white',
          zIndex: '5',
        }}
      >
        <ScrollView
          scrollX
          style={{
            width: '87%',
            whiteSpace: 'nowrap',
          }}
        >
          {tabList?.map((tab) => (
            <View
              style={{
                fontSize: '30rpx',
                marginRight: '5rpx',
                display: 'inline-block',
                backgroundColor: current === tab.title ? '#59a2dc' : '#fff',
                width: '100rpx',
                borderRadius: '30rpx',
                lineHeight: '60rpx',
                textAlign: 'center',
              }}
              onClick={() => handleTabClick(tab.title)}
            >
              {tab.title}
            </View>
          ))}
        </ScrollView>
        <View
          className="at-icon at-icon-chevron-down"
          style={{
            width: '9%',
            textAlign: 'center',
            lineHeight: '60rpx',
            background: '#bbb5b58c',
            borderRadius: '90px',
          }}
          onClick={() => {
            setShowDrawer(true);
          }}
        ></View>
      </View>

      <View
        style={{ paddingTop: '100rpx' }}
        onTouchStart={(e) => {
          startXRef.current = e.touches[0].clientX;
          startYRef.current = e.touches[0].clientY;
        }}
        onTouchMove={(e) => {
          endXRef.current = e.touches[0].clientX;
          endYRef.current = e.touches[0].clientY;
        }}
        onTouchEnd={() => {
          const distanceX = endXRef.current - startXRef.current;
          // console.log('startYRef', endYRef, startYRef);
          const distanceY = endYRef.current - startYRef.current;
          // console.log('123123111', distanceX, distanceY);
          const flags = distanceY < -10 || distanceY > 10;
          if (flags && distanceX > 100) {
            // 设置一个阈值，例如50px，表示滑动距离超过50px才切换tab
            // 向右滑动，切换到前一个tab
            const tab = tabList.findIndex((tab) => tab.title === current) - 1;
            const index = Math.max(tab, 0);
            if (tab < 0) {
              console.log(tab);
              onNavigateToHot();
            }
            handleTabClick(tabList[index].title);
          } else if (flags && distanceX < -10) {
            // 向左滑动，切换到下一个tab
            const index = Math.min(
              tabList.findIndex((tab) => tab.title === current) + 1,
              tabList.length - 1
            );
            handleTabClick(tabList[index].title);
          }
        }}
      >
        {imageUrlsMap[current] && (
          <ImageList imageUrls={imageUrlsMap[current]} />
        )}
      </View>

      <AtFloatLayout isOpened={showDrawer} onClose={() => setShowDrawer(false)}>
        <Title />
        {tabList?.map((tab) => (
          <View
            style={{
              fontSize: '30rpx',
              marginLeft: '40rpx',
              whiteSpace: 'nowrap',
              fontWeight: current === 'hot' ? 'bold' : 'normal',
              display: 'inline-block',
              backgroundColor: current === tab.title ? '#black' : '#red',
              height: '60rpx',
              width: '100rpx',
              borderRadius: '30rpx',
              lineHeight: '60rpx',
              textAlign: 'center',
            }}
            onClick={() => {
              setCurrent(tab.title);
              setImageUrls(tags_image[current]);
              setShowDrawer(false);
            }}
          >
            {tab.title}
          </View>
        ))}
      </AtFloatLayout>
    </View>
  );
};

const Title = () => (
  <>
    <View
      style={{
        textAlign: 'center',
        fontSize: '40rpx',
      }}
    >
      发现导航
    </View>
    <View style={{ margin: '30rpx' }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        全部频道
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: '24rpx',
          marginLeft: '20rpx',
          fontWeight: 'lighter',
        }}
      >
        点击进入频道
      </Text>
    </View>
  </>
);
const Styles = {
  container: {
    borderRadius: '10rpx',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};
