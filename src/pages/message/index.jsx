/**
 * 消息页
 */
import { View } from '@tarojs/components';
import React, { useCallback, useState } from 'react';
import List from './List.jsx';

export default ({}) => {
  const [current, setCurrent] = useState(0);
  const onClick = useCallback((value) => {
    setCurrent(value);
  });
  return (
    <View>
      {/* <NavigationBar></NavigationBar> */}
      <List></List>
    </View>
  );
};
