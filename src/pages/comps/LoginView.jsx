import { Button, Checkbox, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { navigateTo } from '../../base/global';
import { PAGES } from '../../const/app';

export default ({ onConfirmLogin }) => {
  const [loading, setLoading] = useState(false);
  const [isCheckPolicy, setIsCheckPolicy] = useState(false);
  return (
    <View
      style={{
        marginTop: '40rpx',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <View style={{ fontSize: '40rpx', marginBottom: '40rpx' }}>欢迎登录</View>
      <Button
        style={{
          position: 'relative',
          animation: 'swap 1s infinite',
          width: '90%',
          height: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          lineHeight: '40px',
        }}
        full
        type="primary"
        loading={loading}
        onClick={async () => {
          if (!isCheckPolicy) {
            Taro.showToast({
              title: '请勾选我已阅读并同意《服务协议》和《隐私协议》',
              icon: 'none',
              duration: 2000,
            });
            return;
          }
          setLoading(true);
          await onConfirmLogin().finally(() => {
            setLoading(false);
          });
        }}
      >
        微信授权登录
      </Button>

      <View style={{ fontSize: '24rpx', margin: '40rpx 0' }}>
        <Checkbox
          style={{ fontSize: '20rpx' }}
          checked={isCheckPolicy}
          onClick={() => setIsCheckPolicy(!isCheckPolicy)}
        ></Checkbox>
        <Text>我已阅读并同意</Text>
        <Text
          style={{ color: 'blue' }}
          onClick={() => {
            navigateTo({
              url: PAGES.userAgreements,
            });
          }}
        >
          《用户协议》
        </Text>
        和
        <Text
          style={{ color: 'blue' }}
          onClick={() => {
            navigateTo({
              url: PAGES.userPrivacy,
            });
          }}
        >
          《隐私协议》
        </Text>
      </View>
    </View>
  );
};
