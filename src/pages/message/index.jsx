/**
 * 消息页
 */
import { View } from '@tarojs/components';
import React, { useCallback, useState } from 'react';
import { AtList, AtListItem } from 'taro-ui';
import NavigationBar from './NavigationBar.jsx';
import Taro from '@tarojs/taro';

export default ({}) => {
  const [current, setCurrent] = useState(0);
  const onClick = useCallback((value) => {
    setCurrent(value);
  });
  return (
    <View>
      <NavigationBar></NavigationBar>
      <AtList>
        <AtListItem
          title="有已完成的作品"
          onClick={() => {
            navigateTo({
              url: '/pages/album/index',
            });
          }}
        />
        <AtListItem title="进行中的作品" onClick={() => {}} />
        <AtListItem title="通知" onClick={() => {}} />
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
