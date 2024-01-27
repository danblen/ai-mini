// 导入 Taro 和组件相关的库
import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
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
          // justifyContent: 'space-between',
          // alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: '110rpx',
            marginLeft: '20rpx',
            width: '100rpx',
          }}
          onClick={() => {
            setShowDrawer(true);
          }}>
          <View
            className="at-icon at-icon-menu"
            style={{
              fontSize: '50rpx',
              color: 'black',
            }}></View>
        </View>
        <View style={{ marginLeft: '200rpx', marginTop: '110rpx' }}>
          AI写真
        </View>
      </View>

      <AtDrawer
        show={showDrawer}
        left
        mask
        width="80%"
        onClose={() => setShowDrawer(false)}
        style={{ background: 'black', height: '100%' }}>
        <View style={{ marginTop: '200rpx' }}>
          <View>微信用户</View>
          <View>设置</View>
          <View>深色模式</View>
          <View>退出登陆</View>
        </View>
      </AtDrawer>
    </>
  );
};

// 导出函数式组件
export default NavigationBar;
