// import { useTextSelection } from "@reactuses/core";
import { Image, ScrollView, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { AtIcon } from 'taro-ui';
const photoPage = '/pages/photo/index';
export default ({ albums }) => {
  return (
    <View className="" style={Styles.container}>
      <View style={Styles.flexContainer}>
        <Text style={Styles.title}>写真集</Text>
        <View style={Styles.flexPlaceholder} />
        <Text style={Styles.seeAll}>更多</Text>
        <AtIcon value="chevron-right" size="20"></AtIcon>
      </View>

      <ScrollView
        style={Styles.scroll}
        scrollX
        scrollWithAnimation
        className="">
        {Object.values(albums)?.map?.(albumData => (
          <View className="" style={Styles.imageWrap}>
            <Image
              style={Styles.image}
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
              src={albumData.index}></Image>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const Styles = {
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  flexPlaceholder: {
    flex: 1,
  },
  seeAll: {},
  title: {
    lineHeight: '60rpx',
    marginLeft: '10rpx',
    color: '#121',
    fontSize: '30rpx',
  },
  container: {
    borderRadius: '10rpx',
    background: 'linear-gradient(to right, #79bfa0, #6c9a85)',
    margin: '20rpx',
    marginTop: '20rpx',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '300rpx',
    borderRadius: '10rpx',
    display: 'inline-block',
  },
  imageWrap: {
    paddingLeft: '10rpx',
    display: 'inline-block',
  },
  scroll: {
    whiteSpace: 'nowrap',
  },
};
