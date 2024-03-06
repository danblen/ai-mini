import { Text, View } from '@tarojs/components';
import React from 'react';

export default ({ onCheck }) => {
  const content = '成功分享给群好友也可以获得1次自定义机会哦';

  return (
    <View
      style={{
        fontSize: '40rpx',
        height: 50,
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
      onClick={onCheck}
    >
      <View
        style={{
          height: 50,
          paddingLeft: 10,
          backgroundColor: '#fff',
          width: '96%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Text>签到领积分</Text>
        <Text
          style={{
            fontSize: 10,
          }}
        >
          ({content})
        </Text>
        <View className="at-icon at-icon-chevron-right" />
      </View>
    </View>
  );
};
