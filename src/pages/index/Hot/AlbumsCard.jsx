import { Image, ScrollView, View } from '@tarojs/components';
import React from 'react';
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
          height: 240,
        }}
        scrollX
        scrollWithAnimation
      >
        {albums?.map?.((albumData) => (
          <Image
            style={{
              marginLeft: '18rpx',
              width: 160,
              borderRadius: '15rpx',
            }}
            // lazyLoad={true}
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
