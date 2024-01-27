import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';

export default () => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <>
      <View
        style={{
          height: '80rpx',
          width: '100%',
          display: 'flex',
        }}>
        <View
          className="at-icon at-icon-menu"
          style={{
            marginLeft: '20rpx',
            fontSize: '50rpx',
            color: 'black',
          }}
          onClick={() => {
            setShowDrawer(true);
          }}></View>
        <View
          style={{
            width: '400rpx',
            height: '60rpx',
            borderRadius: '50rpx',
            marginLeft: '30rpx',
            paddingLeft: '30rpx',
            backgroundColor: '#f5f5f5',
            lineHeight: '60rpx',
          }}
          onClick={() => {
            Taro.navigateTo({ url: '/pages/search/index' });
          }}>
          <Text
            className="at-icon at-icon-search"
            style={{
              fontSize: '30rpx',
            }}></Text>
          <Text
            style={{
              fontSize: '30rpx',
              marginLeft: '10rpx',
            }}>
            搜全站
          </Text>
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
