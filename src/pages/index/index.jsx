/**
 * 首页
 */

import { View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import { get_all_images } from '../../api/index.js';
import Buttons from '../comps/Buttons.jsx';
import AlbumsCard from './AlbumsCard';
import NavBar from './NavBar.jsx';
import TabsImageList from './TabsImageList';
import TopBanner from './TopBanner.jsx';
import WaterfallPage from './WaterfallPage.jsx';

export default () => {
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
  const getAllImages = async () => {
    let allImages = await get_all_images();
    if (allImages) {
      setAllImages(allImages);
    }
  };
  useEffect(() => {
    getAllImages();
  }, []);
  return (
    <>
      {/* <View
        style={{
          position: 'fixed',
          top: '-5rpx',
          left: 0,
          width: '100%',
          // height: '180rpx',
          backgroundColor: '#fff',
          opacity: '0.9',
          paddingTop: '100rpx',
          zIndex: '1000',
        }}> */}
      <NavBar></NavBar>
      {/* </View> */}

      <View
        style={{
          background: 'linear-gradient(to left, #2d7948, #6d8a78)',
          marginTop: '180rpx',
        }}>
        <TopBanner banners={allImages?.banners} />
        <Buttons
          buttons={[
            {
              imageUrl: require('../../static/image/my/icons8-joker-dc-200.png'),
              pagePath: '/pages/activity/Activity',
              text: '#反派挑战',
              params: {
                title: '#反派挑战',
                description:
                  '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
              },
            },
            {
              imageUrl: require('../../static/image/my/icons8-神奇女侠-100.png'),
              pagePath: '/pages/activity/Activity',
              text: '#繁花专场',
              params: {
                title: '#繁花专场',
                description: '繁花专场\n参与活动，获取丰富奖励~',
              },
            },
            {
              imageUrl: require('../../static/image/my/icons8-编辑图像-100.png'),
              pagePath: '/pages/refine/index',
              text: 'AI修图',
              params: {
                title: '#AI修图',
                description:
                  '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
              },
            },
            {
              imageUrl: require('../../static/image/my/icons8-获得现金-100.png'),
              pagePath: '/pages/activity/Activity',
              text: '晒一晒加积分',
              params: {
                title: '#晒一晒加积分',
                description: '晒一晒你的作品，获取积分',
              },
            },
            // Add more buttons as needed
          ]}
        />
        <AlbumsCard albums={allImages?.albums} />
        <WaterfallPage />
        <TabsImageList tags_image={allImages?.tags_image} />
      </View>
    </>
  );
};
