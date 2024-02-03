import { Text, View } from '@tarojs/components';
import { useState } from 'react';
import LeftDrawer from '../comps/LeftDrawer';
import { login, storeImages } from '../../api';

export default () => {
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
          alignItems: 'center',
        }}
      >
        <View
          className="at-icon at-icon-menu"
          style={{
            height: '100rpx',
            lineHeight: '98rpx',
            marginLeft: '20rpx',
            fontSize: '50rpx',
            color: 'black',
          }}
          onClick={() => {
            setShowDrawer(true);
          }}
        ></View>
        <View
          style={{
            width: '400rpx',
            height: '62rpx',
            lineHeight: '62rpx',
            borderRadius: '50rpx',
            marginLeft: '30rpx',
            paddingLeft: '30rpx',
            backgroundColor: '#f5f5f5',
          }}
          onClick={() => {
            navigateTo({ url: '/pages/search/index' });
          }}
        >
          <View
            className="at-icon at-icon-search"
            style={{
              fontSize: '30rpx',
            }}
          ></View>
          <Text
            style={{
              fontSize: '30rpx',
              marginLeft: '10rpx',
            }}
          >
            搜全站
          </Text>
        </View>
      </View>

      <LeftDrawer
        showDrawer={showDrawer}
        onClose={() => {
          setShowDrawer(false);
        }}
      />
    </View>
  );
};
