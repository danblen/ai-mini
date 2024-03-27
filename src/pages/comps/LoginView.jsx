import { Button, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { useState } from 'react';
import { navigateTo } from '../../base/global';
import { saveUserInfo, saveUserToken, wechatLogin } from '../../common/user';
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
          const res = await wechatLogin().finally(() => {
            setLoading(false);
          });
          if (res?.data) {
            saveUserInfo({
              isLogin: true,
              data: res.data,
            });
            saveUserToken(res?.data?.token);
            onConfirmLogin(res);
          }
        }}
      >
        微信授权登录
      </Button>

      <View
        style={{
          fontSize: '24rpx',
          margin: '40rpx 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'relative',
            width: 25,
            height: 25,
            display: 'inline-block',
          }}
        >
          <View
            style={{
              opacity: isCheckPolicy ? 0 : 1,
              width: 16,
              height: 16,
              border: '1px solid',
              borderRadius: '50%',
              position: 'absolute',
              borderColor: 'black',
              top: 3,
            }}
            onClick={(e) => {
              setIsCheckPolicy(!isCheckPolicy);
            }}
          ></View>
          <View
            style={{
              opacity: isCheckPolicy ? 1 : 0,
              color: 'black',
              position: 'absolute',
              top: 3,
              fontSize: 18,
            }}
            className="at-icon at-icon-check-circle"
            onClick={(e) => {
              setIsCheckPolicy(!isCheckPolicy);
            }}
          ></View>
        </View>
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
