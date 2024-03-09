/**
 * 用户页
 */
import { Image, Text, View, Input, Button } from '@tarojs/components';
import Taro, { useDidShow, useTabItemTap } from '@tarojs/taro';
import React, { useState } from 'react';
import { AtFloatLayout } from 'taro-ui';
import { api, get_user_info } from '../../api';
import { navigateTo } from '../../base/global';
import { clearUserInfo, saveUserInfo } from '../../common/user';
import iconwechat from '../../static/image/share/icon_wechat.png';
import LoginView from '../comps/LoginView';
import CheckIn from './CheckIn';
import ButtonView from './ButtonView';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';

export default () => {
  const [isOpenedText, setIsOpenedText] = useState(false);
  const [nickname, setNickname] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  // 用户信息数据结构，和storage中存储的一致
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      userId: '',
      isChecked: false,
      avatarUrl: '',
      userName: '输入昵称',
    },
  });
  // 获取用户信息
  const fetchUserInfo = async () => {
    let userInfo = global.userInfo;
    // storage或global中有数据表示用户已经登陆
    if (userInfo?.isLogin && userInfo.data?.userId) {
      // if (userInfo) {
      let res = await get_user_info({
        userId: userInfo.data.userId,
      });
      // 所有接口都可通过这种方式判断调用成功与否
      if (res?.data) {
        setUserInfo((pre) => ({
          ...pre,
          isLogin: true,
          data: res.data,
        }));
        saveUserInfo({
          isLogin: true,
          data: res.data,
        });
      } else {
        // 获取用户数据失败
        setUserInfo({
          isLogin: false,
          data: {},
        });
      }
    } else {
      // 用户未登陆，清空
      setUserInfo({
        isLogin: false,
        data: {},
      });
    }
  };
  // 每次点击到tabbar 我的 都会触发，更新用户信息并刷新页面
  useTabItemTap((tab) => {});
  useDidShow(() => {
    fetchUserInfo();
  });

  const handleNicknameClick = () => {
    setIsOpenedText(true);
  };

  const handleConfirm = async () => {
    // 关闭弹窗
    setIsOpenedText(false);
    if (userInfo.isLogin) {
      const res = await api.updateUserInfo({
        userId: userInfo.data.userId,
        userName: nickname,
      });
      if (res?.data) {
        fetchUserInfo();
      }
    }
  };
  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: '#f7e9e2',
          height: '400rpx',
          paddingTop: 90,
          backgroundImage: 'linear-gradient(to right, #67B26F, #4ca2cd)', // 添加渐变背景
        }}
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <View>
            <Image
              mode="aspectFill"
              className="avatar"
              style={{
                flex: 1,
                marginLeft: '30rpx',
                borderRadius: '10%',
                width: '150rpx',
                height: '150rpx',
              }}
              src={userInfo?.data?.userHeadPic || iconwechat}
            />
          </View>
          <View
            className=""
            style={{
              flex: 3,
              marginLeft: '50rpx',
            }}
          >
            {userInfo?.isLogin && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                  height: '150rpx',
                }}
              >
                <View
                  style={{
                    fontSize: '40rpx',
                  }}
                  onClick={handleNicknameClick}
                >
                  {userInfo.data.userName}
                </View>
                <AtModal isOpened={isOpenedText}>
                  <AtModalHeader>请输入昵称</AtModalHeader>
                  <AtModalContent>
                    <Input
                      placeholder="请输入昵称"
                      value={nickname}
                      onInput={(e) => setNickname(e.detail.value)}
                    />
                  </AtModalContent>
                  <AtModalAction>
                    <Button onClick={() => handleConfirm()}>确定</Button>
                  </AtModalAction>
                </AtModal>
                <Text
                  style={{
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                >
                  <Text>ID: {userInfo?.data?.userId}</Text>
                </Text>
                <View
                  style={{
                    fontSize: 12,
                  }}
                >
                  <Text
                    style={{
                      marginRight: 20,
                    }}
                  >
                    积分：{userInfo?.data?.points}
                  </Text>
                  等级：{userInfo?.data?.level}
                </View>
              </View>
            )}
            {!userInfo?.isLogin && (
              <View
                type="primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: 24,
                }}
                onClick={() => setIsOpened(true)}
              >
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  微信一键登录
                </Text>
                <View className="at-icon at-icon-chevron-right" />
              </View>
            )}
          </View>
          <View
            className="at-icon at-icon-settings"
            style={{
              flex: 1,
              fontSize: '48rpx',
              marginLeft: 80,
            }}
            onClick={() => {
              navigateTo({
                url: '/pages/setting/index',
              });
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          borderRadius: '18px',
          position: 'relative',
          backgroundColor: '#f8f8f8',
          top: -30,
          paddingTop: 20,
        }}
      >
        {userInfo.isLogin && !userInfo.data.isChecked && (
          <CheckIn
            onCheck={async () => {
              const res = await api.checkIn({
                userId: global.userInfo.data.userId,
              });
              if (res?.data) {
                setUserInfo((pre) => ({
                  ...pre,
                  isLogin: true,
                  data: res.data,
                }));
                saveUserInfo({
                  isLogin: true,
                  data: res.data,
                });
              }
              Taro.showToast({ title: '积分 +2', icon: 'none' });
              fetchUserInfo();
            }}
          />
        )}

        <ButtonView
          onLogout={() => {
            clearUserInfo();
            setUserInfo({
              isLogin: false,
              data: {
                points: 0,
                userId: '',
                isChecked: false,
                avatarUrl: '',
              },
            });
          }}
        />
      </View>

      <AtFloatLayout
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <LoginView
          onConfirmLogin={async (res) => {
            setUserInfo({
              isLogin: true,
              data: res.data,
            });
            setIsOpened(false);
          }}
        />
      </AtFloatLayout>
    </View>
  );
};
