/**
 * 首页
 */

import { ScrollView, View } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import {
  updateUserInfoFromStorage,
  updateUserTokenFromStorage,
} from '../../common/user';
import NavBar from './NavBar';
import { api } from '../../api/index.js';
import Hot from './Hot';
import Recommend from './Recommend';
import New from './New';

// 在任务完成后调用此函数获取用户授权
function TabContent({
  currentTab,
  banners,
  albums,
  tagImages,
  activityTagsImage,
  navigateToTab,
  recomTitle,
}) {
  const tabComponents = {
    hot: (
      <Hot
        banners={banners}
        albums={albums}
        activityTagsImage={activityTagsImage}
        tagsImage={tagImages}
        onNavigateToTab={navigateToTab}
      />
    ),
    recommend: (
      <Recommend onNavigateToTab={navigateToTab} titleParam={recomTitle} />
    ),
    new: <New tagImages={tagImages} />,
  };
  const TabComponent = tabComponents[currentTab];

  return TabComponent;
}
export default () => {
  const [currentTab, setCurrentTab] = useState('hot');
  const [recomTitle, setRecomTitle] = useState('古装');
  // let [allImages, setAllImages] = useState({ albums: {}, tagsImage: {} });
  const [albums, setAlbums] = useState([]);
  const [banners, setBanners] = useState([]);
  const [activityTagsImage, setActivityTagsImage] = useState([]);
  let [tagImages, setTagImages] = useState([]);

  // const getAllImages = async () => {
  //   let res = await get_all_images();
  //   if (res?.data) {
  //     const shuffledData = {};
  //     for (const key in res.data.tagsImage) {
  //       if (res.data.tagsImage.hasOwnProperty(key)) {
  //         const shuffledIndexes = res.data.tagsImage[key].sort(
  //           () => Math.random() - 0.5
  //         );
  //         shuffledData[key] = shuffledIndexes;
  //       }
  //     }

  //     // 对 "abc" 进行随机排序
  //     const shuffledKeys = Object.keys(shuffledData).sort(
  //       () => Math.random() - 0.5
  //     );
  //     const shuffledImageData = {};
  //     for (const key of shuffledKeys) {
  //       shuffledImageData[key] = shuffledData[key];
  //     }

  //     res.data.tagsImage = shuffledImageData;
  //     // setAllImages(res.data);
  //   }
  // };
  const getTagImages = async () => {
    let res = await api.getImages([{ tagName: 'NEW' }]);
    if (res?.data) {
      // 过滤掉值为 null 的元素
      const filteredData = res.data[0].filter((item) => item !== null);
      if (filteredData.length > 0) {
        const shuffledImages = filteredData.sort(() => Math.random() - 0.5);
        setTagImages(shuffledImages);
        // setStorageSync('tmpNewTagimages', res.data);
        // setLRHalfPic(res.data);
      }
    }
  };
  const uploadLaunchInfo = async () => {
    // const launchInfo = await getStorage('launchInfo');
    const launchInfo = global.launchInfo;
    api.uploadLaunchInfo({
      launchInfo,
    });
  };
  const getAppImages = async () => {
    const res = await api.getAppImages([
      { category: 'banner' },
      { category: 'albums' },
      { category: 'activity_tags' },
    ]);
    if (res?.data) {
      setBanners(res.data[0]);
      setAlbums(res.data[1]);
      setActivityTagsImage(res.data[2]);
    }
  };
  useEffect(() => {
    // getAllImages();
    getAppImages();
    getTagImages();
    updateUserInfoFromStorage();
    updateUserTokenFromStorage();
  }, []);
  usePullDownRefresh(() => {
    //调用Taro.stopPullDownRefresh 停止下拉效果
    getTagImages().then(() => Taro.stopPullDownRefresh());
  });

  return (
    <ScrollView enhanced showScrollbar={false} scroll-y>
      <NavBar
        currentTab={currentTab}
        onSwitchTab={(tabName) => {
          setCurrentTab(tabName);
        }}
      ></NavBar>
      <ScrollView
        scroll-y
        enhanced
        showScrollbar={false}
        style={{ marginTop: 90 }}
      >
        <TabContent
          currentTab={currentTab}
          banners={banners}
          albums={albums}
          activityTagsImage={activityTagsImage}
          tagImages={tagImages}
          navigateToTab={(param, title) => {
            setCurrentTab(param);
            setRecomTitle(title);
          }}
          recomTitle={recomTitle}
        />
      </ScrollView>
    </ScrollView>
  );
};
const Style = {};
