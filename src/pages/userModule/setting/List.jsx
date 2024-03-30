/**
 * 设置页
 */
import { Text, View } from '@tarojs/components';
import React, { useCallback, useState } from 'react';
import { clearUserInfo } from '../../../common/user';
import { navigateTo } from '../../../base/global';
import { PAGES } from '../../../const/app';

export default ({}) => {
  const [current, setCurrent] = useState(0);
  const onClick = useCallback((value) => {
    setCurrent(value);
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
      <View style={Style.item}>
        <View style={Style.title}>版本号</View>
        <View style={{ fontSize: 12 }}>1.12.0</View>
      </View>
      {/* <View style={Style.item} onClick={() => {}}>
        账户安全设置
      </View>
      <View style={Style.item}>个人信息清单</View> */}
      <View
        style={Style.item}
        onClick={() => {
          navigateTo({ url: PAGES.userPrivacy });
        }}
      >
        隐私协议
      </View>
      <View
        style={Style.item}
        onClick={() => {
          navigateTo({ url: PAGES.userAgreements });
        }}
      >
        用户协议
      </View>
      <View style={Style.item}>清除缓存</View>
      <View
        style={Style.item}
        onClick={() => {
          clearUserInfo();
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
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
  item: {
    borderBottom: '1px solid #f9f9f9',
    height: '80rpx',
    lineHeight: '80rpx',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  title: {},
};
