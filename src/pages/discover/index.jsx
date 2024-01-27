/**
 * 发现页
 */

import { View } from '@tarojs/components';
import React, { useCallback, useState } from 'react';
import Buttons from '../comps/Buttons';
import NavigationBar from './NavigationBar';
import Hot from './Hot';
import New from './New';
import Recommend from './Recommend';

export default ({}) => {
  const [currentTab, setCurrentTab] = useState('recommend');
  return (
    <View>
      <View
        style={{
          position: 'fixed',
          top: '-5rpx',
          left: 0,
          width: '100%',
          backgroundColor: 'transparent',
          paddingTop: '100rpx',
          zIndex: '1000',
        }}>
        <NavigationBar
          currentTab={currentTab}
          onSwitchTab={tabName => {
            setCurrentTab(tabName);
          }}></NavigationBar>
      </View>
      <View style={{ marginTop: '180rpx' }}></View>

      {currentTab === 'recommend' && <Recommend />}
      {currentTab === 'hot' && <Hot />}
      {currentTab === 'new' && <New />}
    </View>
  );
};
const Style = {};
