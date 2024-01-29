// import { useTextSelection } from "@reactuses/core";
import { Image, ScrollView, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { AtIcon } from 'taro-ui';
const photoPage = '/pages/photo/index';
export default ({ albums }) => {
  return (
    <View
      style={{
        borderRadius: '15rpx',
        marginTop: '20rpx',
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
        {Object.values(albums)?.map?.((albumData) => (
          <Image
            style={{
              marginLeft: '18rpx',
              width: '300rpx',
              borderRadius: '15rpx',
            }}
            className=" "
            mode="widthFix"
            onClick={() => {
              Taro.navigateTo({
                url: photoPage,
                success: function (res) {
                  // 通过eventChannel向被打开页面传送数据
                  res.eventChannel.emit('acceptDataFromOpenerPage', {
                    albumData: albumData,
                  });
                },
              });
            }}
            src={albumData.index}
          ></Image>
        ))}
      </ScrollView>
    </View>
  );
};
