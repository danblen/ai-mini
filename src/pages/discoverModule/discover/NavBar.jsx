import { Text, View } from '@tarojs/components';
import { useState } from 'react';
import LeftDrawer from '../../comps/LeftDrawer';

export default ({ currentTab, onSwitchTab }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <View
      style={{
        position: 'fixed',
        top: '0rpx',
        height: '100rpx',
        paddingTop: '80rpx',
        zIndex: '10',
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          display: 'flex',
        }}
      >
        <View
          className="at-icon at-icon-menu"
          style={{
            marginLeft: '20rpx',
            fontSize: '50rpx',
            color: 'black',
            lineHeight: '100rpx',
          }}
          onClick={() => {
            setShowDrawer(true);
          }}
        ></View>
        <View
          style={{
            marginLeft: '180rpx',
            lineHeight: '100rpx',
          }}
        >
          <Text
            style={{
              fontSize: '30rpx',
              fontWeight: currentTab === 'recommend' ? 'bold' : 'normal',
            }}
            onClick={() => {
              onSwitchTab('recommend');
            }}
          >
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
            }}
          >
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
            }}
          >
            动态
          </Text>
        </View>

        <LeftDrawer
          showDrawer={showDrawer}
          onClose={() => {
            setShowDrawer(false);
          }}
        />
      </View>
    </View>
  );
};
