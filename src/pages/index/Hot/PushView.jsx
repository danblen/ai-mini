/**
 * @description 此组件用于展示主题图片，包括标题、标签名以及主题图片。
 *              相册图片点击时会调用导航函数进行页面跳转。
 *              组件包含滚动视图，可左右滑动浏览相册图片。每张图片下方会显示浏览次数。
 * @param {Object[]} albums - 包含相册数据的数组。每个相册数据应包含图片信息。
 * @param {string} title - 视图组件的标题。
 * @param {string} tagName - 用于从服务器SQL获取相应的标签图片。
 * @param {function} onNavigateToTab - 导航到标签页的函数（暂无用）。
 * @returns {JSX.Element} - 返回一个包含主题图片的视图组件。
 * @example
 * // Example usage:
 * <PushView
 *        allImages={allImages}
 *        albums={allImages?.tagsImage?.['美高Girl'] || []}
 *        title="👩‍🎓美高Girl"
 *        tagName="美高Girl"
 *        onNavigateToTab={onNavigateToTab}
 *      />
 */

import { Image, ScrollView, Text, View } from '@tarojs/components';
import React, { useEffect, useState } from 'react';
import { navigateTo } from '../../../base/global';
import TitleView from './TitleView';
import recomView from '../Recommend/index';
import { api } from '../../../api/index.js';

export default ({ albums, title, description, tagName, onNavigateToTab }) => {
  const [scrollImages, setScrollImages] = useState([]);

  useEffect(() => {
    // 组件挂载时获取图片数据
    const getTagNameImages = async () => {
      try {
        const res = await api.getTagImages({ tagName: tagName });
        if (res?.data) {
          setScrollImages(res.data);
        }
      } catch (error) {
        console.error('Error fetching tag images:', error);
      }
    };

    getTagNameImages();
  }, [tagName]);

  return (
    <View
      style={{
        marginTop: '18rpx',
        marginLeft: '18rpx',
        marginRight: '18rpx',
        borderRadius: '8rpx',
        paddingBottom: '8rpx',
        background: '0% 0% / cover rgb(204, 197, 197, 0.5)',
        // background:'#fff'
      }}
    >
      <TitleView
        title={title}
        rightText="全部>"
        // onRightClick={handleRightClick} //跳转到推荐页
        infoTopRightImage={{
          pagePath: '/pages/activity/Activity',
          params: {
            title: tagName,
            description: description,
            pagePath: '/pages/activity/Activity',
            text: tagName,
          },
        }}
      />

      <ScrollView
        style={{
          whiteSpace: 'nowrap',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
        scroll-x
        scrollWithAnimation
      >
        {scrollImages.map((albumData, index) => (
          <View
            key={index}
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              height: 160,
            }}
          >
            <Image
              style={{
                marginLeft: '18rpx',
                width: '120px', // 设置图片宽度为 120 rpx
                // height: '120px', // 设置图片高度为 120 rpx
                borderRadius: 10,
              }}
              mode="aspectFill"
              className=" "
              onClick={() => {
                navigateTo({
                  url:
                    '/pages/faceswap/index?imageUrl=' +
                    albumData.momentPics +
                    '&momentId=' +
                    albumData.momentId,
                });
              }}
              src={albumData.momentPics}
            ></Image>
            <View
              style={{
                position: 'absolute',
                top: '90%',
                opacity: 0.8,
                left: 10,
                borderRadius: 5,
                background: '#f9f9f9a6',
                fontSize: 12,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <View className="at-icon at-icon-eye"></View>
              {albumData.viewCount}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
