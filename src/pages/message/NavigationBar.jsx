import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';

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
        }}>
        <View style={{ marginTop: '110rpx' }}>消息</View>
      </View>

      <AtDrawer
        show={showDrawer}
        left
        mask
        width="80%"
        onClose={() => setShowDrawer(false)}
        style={{ background: 'black', height: '100%' }}>
        <View>
          <View>sad</View>
          <View>sad</View>
          <View>sad</View>
          <View>sad</View>
        </View>
      </AtDrawer>
    </>
  );
};

// 导出函数式组件
export default NavigationBar;
