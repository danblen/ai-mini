// import { useTextSelection } from "@reactuses/core";
import { Image, ScrollView, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { AtIcon } from 'taro-ui';
import { navigateTo } from '../../../base/global';
import { PAGES } from '../../../const/app';
export default ({ albums }) => {
  return (
    <View
      style={{
        borderRadius: '15rpx',
      }}
    >
      <ScrollView
        style={{
          whiteSpace: 'nowrap',
          display: 'flex',
        }}
        scrollX
        scrollWithAnimation
      >
        {albums?.map?.((albumData) => (
          <Image
            style={{
              marginLeft: '18rpx',
              width: '300rpx',
              borderRadius: '15rpx',
            }}
            lazyLoad={true}
            className=" "
            mode="widthFix"
            onClick={() => {
              navigateTo({
                url: PAGES.photo,
                success: function (res) {
                  // 通过eventChannel向被打开页面传送数据
                  res.eventChannel.emit('acceptDataFromOpenerPage', {
                    albumData: albumData,
                  });
                },
              });
            }}
            src={albumData.imageUrl}
          ></Image>
        ))}
      </ScrollView>
    </View>
  );
};
