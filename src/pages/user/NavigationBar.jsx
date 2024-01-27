import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';

const NavigationBar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <View
      style={{
        height: '180rpx',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          color: 'white',
          marginTop: '90rpx',
          marginLeft: '20rpx',
        }}
        onClick={() => {
          setShowDrawer(true);
        }}>
        <View
          className="at-icon at-icon-menu"
          style={{
            fontSize: '50rpx',
            position: 'fixed',
            color: 'black',
          }}></View>
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
    </View>
  );
};

// 导出函数式组件
export default NavigationBar;
