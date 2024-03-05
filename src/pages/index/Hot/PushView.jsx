import { Image, ScrollView, Text, View } from '@tarojs/components';
import React from 'react';
import { navigateTo } from '../../../base/global';
import TitleView from './TitleView';
const photoPage = '/pages/faceswap/index';
export default ({ albums, title }) => {
  return (
    <View
      style={{
        marginTop: '18rpx',
        marginLeft: '18rpx',
        marginRight: '18rpx',
        borderRadius: '8rpx',
        paddingBottom: '8rpx',
        background: '0% 0% / cover rgb(204, 197, 197)',
        // background:'#fff'
      }}
    >
      <TitleView
        // imageUrl="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
        title={title}
        rightText="查看全部"
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
        {Object.values(albums)?.map?.((albumData, index) => (
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
                  url: '/pages/faceswap/index?imageUrl=' + albumData,
                });
              }}
              src={albumData}
            ></Image>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                opacity: 0.5,
                left: 10,
                borderRadius: 5,
                background: 'gray',
                fontSize: 12,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              <View className="at-icon at-icon-eye"></View>
              {123}
            </View>
            {/* <View
              style={{
                marginLeft: '18rpx',
              }}
            >
              {343242}
            </View> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
