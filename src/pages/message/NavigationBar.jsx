import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';
import LeftDrawer from '../comps/LeftDrawer';

const NavigationBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <View
        style={{
          height: '180rpx',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <View style={{ marginTop: '110rpx' }}>作品</View>
      </View>

      <LeftDrawer></LeftDrawer>
    </>
  );
};

// 导出函数式组件
export default NavigationBar;
