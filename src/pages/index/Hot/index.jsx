/**
 * 首页
 */

import { Text, View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import { api, get_all_images } from '../../../api/index.js';
import ButtonsBox from '../../comps/ButtonsBox.jsx';
import AlbumsCard from '../AlbumsCard.jsx';
import PopularTemplate from '../PopularTemplate.jsx';
import NavBar from '../NavBar.jsx';
import TopBanner from '../TopBanner.jsx';
import WaterfallList from '../WaterfallList.jsx';
import Taro from '@tarojs/taro';

export default () => {
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
  const getAllImages = async () => {
    let res = await get_all_images();
    if (res?.data) {
      setAllImages(res.data);
      Taro.setStorageSync('tmpAllimages', res.data);
    }
  };
  useEffect(() => {
    // getBanners();
    const tmpAllimages = getStorageSync('tmpAllimages');
    if (!tmpAllimages) {
      getAllImages();
    } else {
      setAllImages(tmpAllimages);
    }
    const timer = setInterval(() => {
      getAllImages();
    }, 1 * 60 * 1000); // 10分钟
  }, []);
  return (
    <>
      {/* <NavBar></NavBar> */}

      <View
        style={{
          marginTop: '180rpx',
        }}
      >
        <TopBanner banners={allImages?.bannerImage?.['首页日更']} />
        <ButtonsBox
          buttons={[
            {
              imageUrl: require('../../../static/image/my/icons8-joker-dc-200.png'),
              pagePath: '/pages/activity/Activity',
              text: '#影楼风格',
              params: {
                imageUrl: allImages?.activityTagsImage?.['影楼风格'],
                title: '影楼',
                description: '影楼风格',
                pagePath: '/pages/activity/Activity',
                text: '影楼风格',
              },
            },
            {
              imageUrl: require('../../../static/image/my/icons8-神奇女侠-100.png'),
              pagePath: '/pages/activity/Activity',
              text: '#繁花专场',
              params: {
                imageUrl: allImages?.activityTagsImage?.['繁花专场'],
                title: '繁花专场',
                description: '繁花专场\n参与活动，获取丰富奖励~',
                pagePath: '/pages/activity/Activity',
                text: '繁花专场',
              },
            },
            {
              imageUrl: require('../../../static/image/my/icons8-编辑图像-100.png'),
              pagePath: '/pages/refine/index',
              text: 'AI修图',
              params: {
                title: '#AI修图',
                description:
                  '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
              },
            },
            {
              imageUrl: require('../../../static/image/my/icons8-获得现金-100.png'),
              pagePath: '/pages/activity/Activity',
              text: '晒一晒加积分',
              params: {
                title: '#晒一晒加积分',
                description: '晒一晒你的作品，获取积分',
              },
            },
          ]}
        />

        <View
          style={{
            padding: '8px',
            marginTop: '20px',
            marginBottom: '20px',
            marginLeft: '10rpx',
            marginRight: '10rpx',
            borderRadius: '8rpx',
            background: '#dcdadacf',
          }}
        >
          <View
            style={{
              fontSize: '36rpx',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                marginLeft: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
              }}
            >
              写真集
            </Text>
            {/* <View
          style={{
            display: 'flex',
            color: 'grey',
            justifyContent: 'space-between',
          }}>
          <View style={{}}>更多</View>
          <View
            className="at-icon at-icon-chevron-right"
            style={{
              fontSize: '50rpx',
            }}></View>
        </View> */}
          </View>
          <AlbumsCard albums={allImages?.albums} />
        </View>

        <PopularTemplate activityTagsImage={allImages?.activityTagsImage} />

        <View
          style={{
            fontSize: '36rpx',
            margin: '40rpx 18rpx 18rpx 18rpx ',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* <Text style={{}}>最近热门</Text> */}
        </View>
        <WaterfallList
          imageListLeft={allImages?.activityTagsImage?.['chunyu'] || []}
          imageListRight={allImages?.activityTagsImage?.['fenweigan'] || []}
        />
      </View>
    </>
  );
};
