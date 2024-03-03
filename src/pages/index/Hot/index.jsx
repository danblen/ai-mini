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
import AlbumsCard from '../AlbumsCard.jsx';
// import tabSelect from '../tabSelect.jsx';
import PopularTemplate from '../PopularTemplate.jsx';
import TopBanner from '../TopBanner.jsx';

let firstGetImages = 0;
export default () => {
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
      <View style={{ marginTop: '5px' }}>
        <AtNoticebar icon="volume-plus">
          {notices[currentNoticeIndex]}
        </AtNoticebar>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          // alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        {/* 左边大图 */}
        <View style={{ width: '49%' }}>
          <Image
            src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
            style={{ width: '100%', maxHeight: '100vh', objectFit: 'cover' }}
          />
          <Image
            src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
            style={{ width: '100%', maxHeight: '100vh', objectFit: 'cover' }}
          />
        </View>
        {/* 右侧布局 */}
        <View
          style={{
            // flex: 1,
            width: '49%',
            // marginLeft: '5px',
            // display: 'flex',
            // flexDirection: 'column',
            overflow: 'hidden', // 设置容器的 overflow 属性为 hidden
          }}
        >
          {/* 上半部分两个小图 */}
          <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Image
                mode="widthFix"
                src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
                style={{ width: '100%' }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Image
                mode="widthFix"
                src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
                style={{ width: '100%' }}
              />
            </View>
          </View>
          <View>
            {/* 下半部分长方形图 */}
            <Image
              src="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
              style={{
                width: '100%',
                marginTop: '5px',
                objectFit: 'cover',
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
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
      </View>

      <View
        style={{
          marginTop: '20px',
          paddingTop: 10,
          marginLeft: '18rpx',
          marginRight: '18rpx',
          borderRadius: '8rpx',
          background: '#dcdadacf',
          // background:'#fff'
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
              }}
            >
              <View style={{}}>更多</View>
              <View
                className="at-icon at-icon-chevron-right"
                style={{
                  fontSize: '50rpx',
                }}
              ></View>
            </View> */}
        </View>
        <AlbumsCard albums={allImages?.albums} />
      </View>
      <PopularTemplate activityTagsImage={allImages?.activityTagsImage} />

      {/* <View
        style={{
          fontSize: '36rpx',
          margin: '40rpx 18rpx 18rpx 18rpx ',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{}}>最近热门</Text>
      </View> */}
      <WaterfallList
        imageListLeft={leftHalf || []}
        imageListRight={rightHalf || []}
        LeftTop={<CustomTop curTagPage="Hot" />}
      />
    </ScrollView>
  );
};
