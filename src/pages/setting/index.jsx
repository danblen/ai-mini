/**
 * 设置页
 */
import { View } from '@tarojs/components';
import React, { useCallback, useState } from 'react';
import { AtList, AtListItem } from 'taro-ui';

export default ({}) => {
  const [current, setCurrent] = useState(0);
  const onClick = useCallback(value => {
    setCurrent(value);
  });
  return (
    <View>
      <AtList>
        <AtListItem title="版本更新" />
        <AtListItem title="账户安全设置" onClick={() => {}} />
        <AtListItem title="个人信息清单" arrow="right" />
        <AtListItem title="隐私协议" arrow="right" />
        <AtListItem title="用户协议" arrow="right" />
        <AtListItem title="消息推送设置" />
        <AtListItem title="清除缓存" />
        <AtListItem title="退出登录" onClick={() => {}} />
      </AtList>
    </View>
  );
};
const Style = {
  wrap: {
    display: 'flex',
  },
  item: {
    width: '200rpx',
    height: '50rpx',
    border: '1px solid #aaa',
  },
  start: {
    width: '500rpx',
  },
};
