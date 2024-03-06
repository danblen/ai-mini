/**
 * 首页
 */

import { ScrollView, Text, View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { AtNoticebar } from 'taro-ui';
import { api, get_all_images } from '../../../api/index.js';
import { getStorageSync, setStorageSync } from '../../../base/global.js';
import ButtonsBox from '../../comps/ButtonsBox.jsx';
import CustomTop from '../../comps/CustomTop.jsx';
import WaterfallList from '../../comps/WaterfallList.jsx';
// import tabSelect from '../tabSelect.jsx';
import PopularTemplate from '../PopularTemplate.jsx';
import TopBanner from '../TopBanner.jsx';
import CardView from './CardView.jsx';
import PushView from './PushView.jsx';
import ButtonView from './ButtonView.jsx';
import CardPhotoView from './CardPhotoView.jsx';
import TitleView from './TitleView.jsx';

let firstGetImages = 0;
export default ({ onNavigateToTab }) => {
  let [allImages, setAllImages] = useState({ albums: {}, tags_image: {} });
  const [leftHalf, setLeftHalf] = useState();
  const [rightHalf, setRightHalf] = useState();
  const setLRHalfPic = async (originalImageArray) => {
    // 计算数组长度的一半
    const halfLength = Math.ceil(originalImageArray.length / 2 - 1);
    // 将原始数组切割成两半
    setLeftHalf(originalImageArray.slice(0, halfLength));
    setRightHalf(originalImageArray.slice(halfLength));
  };
  const getAllImages = async () => {
    let res = await get_all_images();
    if (res?.data) {
      setAllImages(res.data);
      setStorageSync('tmpAllimages', res.data);
    }
  };
  const getTagImages = async () => {
    let res = await api.getTagImages({ tagName: 'Hot' });
    if (res?.data) {
      setStorageSync('tmpHotTagimages', res.data);
      setLRHalfPic(res.data);
    }
  };
  if (!firstGetImages) {
    firstGetImages = 1;
    getAllImages();
    getTagImages();
  }
  useEffect(() => {
    const tmpAllimages = getStorageSync('tmpAllimages');
    if (!tmpAllimages) {
      getAllImages();
    } else {
      setAllImages(tmpAllimages);
    }
    const tmpHotTagimages = getStorageSync('tmpHotTagimages');
    if (!tmpHotTagimages) {
      getTagImages();
    } else {
      setLRHalfPic(tmpHotTagimages);
    }
    // const timer = setInterval(() => {
    //   getAllImages();
    //   getTagImages();
    // }, 1 * 60 * 1000); // 1分钟
  }, []);
  const notices = [
    '每日签到即可加积分💕',
    '尝试使用标准人像照进行换脸，可能效果更好🤩',
    '换脸精修模式更好看🥰',
    '别人使用你发布的模板，你也会得到积分✌',
  ];

  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 切换到下一条通知
      setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % notices.length);
    }, 5000); // 设置每条通知显示的时间，这里设置为1秒

    return () => {
      clearTimeout(timer);
    };
  }, [currentNoticeIndex]);
  return (
    <ScrollView enhanced showScrollbar={false} scroll-y>
      <TopBanner banners={allImages?.bannerImage?.['首页日更']} />

      <View
        style={{
          marginTop: '5px',
          // marginTop: '200px',
        }}
      >
        <AtNoticebar icon="volume-plus">
          {notices[currentNoticeIndex]}
        </AtNoticebar>
      </View>

      {/* <ButtonView allImages={allImages} /> */}
      <CardView
        infoLeftImage={{
          pagePath: '/pages/activity/Activity',
          params: {
            imageUrl: allImages?.activityTagsImage?.['影楼'],
            title: '影楼',
            description: '影楼风格',
            pagePath: '/pages/activity/Activity',
            text: '影楼风格',
          },
        }}
        infoTopLeftImage={{
          pagePath: '/pages/activity/Activity',
          params: {
            imageUrl: allImages?.activityTagsImage?.['繁花专场'],
            title: '繁花专场',
            description: '繁花专场\n参与活动，获取丰富奖励~',
            pagePath: '/pages/activity/Activity',
            text: '繁花专场',
          },
        }}
        infoTopRightImage={{
          pagePath: '/pages/activity/Activity',
          params: {
            imageUrl: allImages?.tagsImage?.['韩式证件照'],
            title: '韩式证件照',
            description: '韩式证件照\n参与活动，获取丰富奖励~',
            pagePath: '/pages/activity/Activity',
            text: '韩式证件照',
          },
        }}
        // infoTopRightImage={{
        //   pagePath: '/pages/refine/index',
        //   params: {
        //     imageUrl: allImages?.activityTagsImage?.['焱落纱'],
        //     title: '#AI修图',
        //     description: '分享你当反派能活到第几集\n参与活动，获取丰富奖励~',
        //   },
        // }}
      />

      <CardPhotoView allImages={allImages} />
      <PushView
        albums={allImages?.tagsImage?.['美高Girl'] || []}
        title="👩‍🎓 美高Girl"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        albums={allImages?.tagsImage?.['江南'] || []}
        title="🏞️ 江南"
        onNavigateToTab={onNavigateToTab}
      />
      <PushView
        albums={allImages?.tagsImage?.['暗调'] || []}
        title="🖤 暗调"
        onNavigateToTab={onNavigateToTab}
      />
      <PopularTemplate activityTagsImage={allImages?.activityTagsImage} />

      {/* <View
        style={{
          fontSize: '36rpx',
          margin: '40rpx 18rpx 18rpx 18rpx ',
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
          最近热门
        </Text>
      </View> */}
      {/* <TitleView title="最近热门" rightText="" />
      <WaterfallList
        imageListLeft={leftHalf || []}
        imageListRight={rightHalf || []}
        LeftTop={<CustomTop curTagPage="Hot" />}
      /> */}
    </ScrollView>
  );
};
