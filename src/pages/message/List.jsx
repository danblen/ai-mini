/**
 * 消息列表
 */
import { Text, View } from '@tarojs/components';
import React from 'react';
import { navigateTo } from '../../base/global';

export default ({}) => {
  return (
    <View style={Style.list}>
      <View
        style={Style.item}
        onClick={() => {
          navigateTo({
            url: '/pages/album/index',
          });
        }}
      >
        <Text style={Style.title}>有已完成的作品</Text>
      </View>
      <View style={Style.item} onClick={() => {}}>
        账户安全设置
      </View>
      <View style={Style.item}>进行中的作品</View>
      <View style={Style.item} onClick={() => {}}>
        通知
      </View>
    </View>
  );
};
const Style = {
  list: {
    backgroundColor: '#fff',
    paddingLeft: 20,
  },
  item: {
    height: '80rpx',
    lineHeight: '80rpx',
  },
  title: {},
};
