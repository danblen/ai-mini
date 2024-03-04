import { Image, ScrollView, Text, View } from '@tarojs/components';
import React from 'react';
import { navigateTo } from '../../../base/global';
import TitleView from './TitleView';
const photoPage = '/pages/photo/index';
export default ({ albums }) => {
  return (
    <>
      <TitleView
        imageUrl="https://facei.top/static/allImages/activity_tags/%E6%B8%AF%E9%A3%8E/lszu7ifdfwjkb-1.jpg"
        title="写真集"
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
        {Object.values(albums)?.map?.((albumData) => (
          <View
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              height: 120,
            }}
          >
            <Image
              style={{
                marginLeft: '18rpx',
                width: 100,
                height: 100,
                borderRadius: 10,
              }}
              className=" "
              onClick={() => {
                navigateTo({
                  url: photoPage,
                  success: function (res) {},
                });
              }}
              src={albumData.index}
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
            <View
              style={{
                marginLeft: '18rpx',
              }}
            >
              {343242}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};
