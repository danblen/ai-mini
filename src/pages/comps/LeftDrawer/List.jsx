/**
 * 设置页
 */
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React from 'react';
import { navigateTo, setStorageSync } from '../../../base/global.js';
import { PAGES } from '../../../const/app.js';

export default ({ userInfo, onLogout }) => {
  // const items = [
  //   '版本更新',
  //   '账户安全设置',
  //   '个人信息清单',
  //   '隐私协议',
  //   '用户协议',
  //   '消息推送设置',
  //   '清除缓存',
  //   '退出登录',
  // ];
  return (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingLeft: 10,
        marginTop: 20,
      }}
    >
      {/* <View style={Style.item}>
        <Text style={Style.title}>版本更新</Text>
      </View> */}
      {/* <View style={Style.item} onClick={() => {}}>
        账户安全设置
      </View> */}
      {/* <View style={Style.item}>个人信息清单</View> */}
      <View
        style={Style.item}
        onClick={() => {
          navigateTo({ url: PAGES.message });
        }}
      >
        我的消息
      </View>
      <View
        style={Style.item}
        onClick={() => {
          navigateTo({ url: '/pages/user/privacy/index' });
        }}
      >
        隐私协议
      </View>
      <View
        style={Style.item}
        onClick={() => {
          navigateTo({ url: '/pages/user/agreements/index' });
        }}
      >
        用户协议
      </View>
      {/* <View style={Style.item}>消息推送设置</View> */}
      <View
        style={Style.item}
        onClick={async () => {
          setStorageSync('filesData', null);
          setStorageSync('tmpAllimages', null);
          setStorageSync('processedImages', null);

          Taro.showToast({
            title: '已清除缓存',
            icon: 'none',
            duration: 2000,
          });
        }}
      >
        清除缓存
      </View>
      <View style={Style.item} onClick={onLogout}>
        退出登录
      </View>
    </View>
  );
};
const Style = {
  item: {
    borderBottom: '1px solid #f9f9f9',
    height: '80rpx',
    lineHeight: '80rpx',
  },
};
