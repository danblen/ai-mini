/**
 * 设置页
 */
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useCallback, useState } from 'react';
import {
  clearStorageUserInfo,
  clearGlobalUserInfo,
} from '../../../common/user.js';

export default ({ onClose }) => {
  const [current, setCurrent] = useState(0);
  const onClick = useCallback((value) => {
    setCurrent(value);
  });
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      userId: '',
      isChecked: false,
    },
  });
  const items = [
    '版本更新',
    '账户安全设置',
    '个人信息清单',
    '隐私协议',
    '用户协议',
    '消息推送设置',
    '清除缓存',
    '退出登录',
  ];
  return (
    <View style={Style.list}>
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
          console.log('清除缓存');
          // setStorageSync('userInfo', null);
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
      <View
        style={Style.item}
        onClick={() => {
          setUserInfo({
            isLogin: false,
            data: {},
          });
          Taro.setStorageSync('userInfo', {
            isLogin: false,
            data: {},
          });

          Taro.showToast({
            title: '已退出',
            icon: 'none',
            duration: 2000,
          });
          onClose();
        }}
      >
        退出登录
      </View>
    </View>
  );
};
const Style = {
  list: {
    borderRadius: 10,
    backgroundColor: '#fff',
    border: '1px solid #fff',
    paddingLeft: 20,
    margin: 10,
  },
  item: {
    // backgroundColor: '#fff',
    borderBottom: '1px solid #f9f9f9',
    height: '80rpx',
    lineHeight: '80rpx',
  },
  title: {},
};
