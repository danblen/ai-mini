import { View } from '@tarojs/components';
import React from 'react';

export default ({ onCheck }) => {
  const content = '成功分享给群好友也可以获得1次自定义机会哦';

  return (
    <View
      style={{
        fontSize: '40rpx',
        height: '100rpx',
        borderRadius: '10px',
        backgroundColor: '#fff',
        top: '10rpx',
        margin: '10px',
        right: '10rpx',
        padding: '10rpx',
      }}
      onClick={onCheck}
    >
      <View
        style={{
          lineHeight: '100rpx',
        }}
      >
        签到领积分
        <View className="at-icon at-icon-chevron-right" />
      </View>
    </View>
  );
};
