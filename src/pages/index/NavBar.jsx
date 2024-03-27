import { Text, View } from '@tarojs/components';
import { useState } from 'react';
import { AtDrawer } from 'taro-ui';
import LeftDrawer from '../comps/LeftDrawer';

export default ({ currentTab, onSwitchTab }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <View
      style={{
        position: 'fixed',
        top: 0,
        height: 90,
        width: '100%',
        zIndex: '10',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundImage: global.t.bgImage, // 添加渐变背景
      }}
    >
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          width: '100%',
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            className="at-icon at-icon-menu"
            style={{
              fontSize: '50rpx',
              paddingLeft: 10,
            }}
            onClick={() => {
              setShowDrawer(true);
            }}
          ></View>
        </View>
        <View
          style={{
            width: '40%',
            display: 'flex',
            justifyContent: 'space-around',
            fontSize: '30rpx',
          }}
        >
          <Text
            style={{
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
              fontWeight: currentTab === 'new' ? 'bold' : 'normal',
            }}
            onClick={() => {
              onSwitchTab('new');
            }}
          >
            动态
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
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
