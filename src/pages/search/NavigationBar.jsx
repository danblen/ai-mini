import { Input, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';

export default () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <View
        style={{
          height: '180rpx',
          width: '100%',
          display: 'flex',
          paddingTop: '100rpx',
        }}>
        <View
          className="at-icon at-icon-chevron-left"
          style={{
            marginLeft: '20rpx',
            fontSize: '50rpx',
            color: 'black',
          }}
          onClick={() => {
            Taro.navigateBack();
          }}></View>
        <Input
          style={{
            width: '400rpx',
            height: '60rpx',
            borderRadius: '50rpx',
            marginLeft: '30rpx',
            paddingLeft: '30rpx',
            backgroundColor: '#f5f5f5',
            lineHeight: '60rpx',
          }}
          placeholder="搜索全站"
          onClick={() => {}}></Input>
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
