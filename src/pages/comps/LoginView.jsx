import { Checkbox, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
// 必须要有/开头
const agreementsUrl = '/pages/user/agreements/index';
const privacyUrl = '/pages/user/privacy/index';

export default ({ onConfirmLogin }) => {
  const [isCheckPolicy, setIsCheckPolicy] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <View
        style={{
          marginTop: '40rpx',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <View style={{ fontSize: '40rpx', marginBottom: '40rpx' }}>
          欢迎登录
        </View>
        <View
          type="primary"
          style={{
            position: 'relative',
            animation: 'swap 1s infinite',
            backgroundColor: 'skyblue',
            width: '90%',
            height: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            lineHeight: '40px',
          }}
          shape="circle"
          className="swap"
          loading={loading}
          onClick={() => {
            if (!isCheckPolicy) {
              Taro.showToast({
                title: '请勾选我已阅读并同意《服务协议》和《隐私协议》',
                icon: 'none',
                duration: 2000,
              });
              return;
            }
            onConfirmLogin();
          }}
        >
          微信授权登录
        </View>

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
                url: agreementsUrl,
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
                url: privacyUrl,
              });
            }}
          >
            《隐私协议》
          </Text>
        </View>
      </View>
    </View>
  );
};
