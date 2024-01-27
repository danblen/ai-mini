import { Text, View } from '@tarojs/components';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';

export default ({ currentTab, onSwitchTab }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
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
          height: '60rpx',
          marginLeft: '180rpx',
          background: 'transparent',
          lineHeight: '60rpx',
        }}>
        <Text
          style={{
            fontSize: '30rpx',
            fontWeight: currentTab === 'recommend' ? 'bold' : 'normal',
          }}
          onClick={() => {
            onSwitchTab('recommend');
          }}>
          推荐
        </Text>
        <Text
          style={{
            fontSize: '30rpx',
            marginLeft: '40rpx',
            fontWeight: currentTab === 'hot' ? 'bold' : 'normal',
          }}
          onClick={() => {
            onSwitchTab('hot');
          }}>
          热门
        </Text>
        <Text
          style={{
            fontSize: '30rpx',
            marginLeft: '40rpx',
            fontWeight: currentTab === 'new' ? 'bold' : 'normal',
          }}
          onClick={() => {
            onSwitchTab('new');
          }}>
          动态
        </Text>
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
