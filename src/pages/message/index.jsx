/**
 * 消息页
 */
import { View } from '@tarojs/components';
import React, { useCallback, useState } from 'react';
import List from './List.jsx';
import NavigationBar from './NavigationBar.jsx';

export default ({}) => {
  const [current, setCurrent] = useState(0);
  const onClick = useCallback((value) => {
    setCurrent(value);
  });
  return (
    <View>
      <NavigationBar></NavigationBar>
      <List></List>
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
