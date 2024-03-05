/**
 * 用户页
 */
import { Image, Text, View } from '@tarojs/components';
import { useDidShow, useTabItemTap } from '@tarojs/taro';
import React, { useState } from 'react';
import { AtFloatLayout } from 'taro-ui';
import { api, get_user_info } from '../../api';
import { navigateTo } from '../../base/global';
import { clearUserInfo, saveUserInfo } from '../../common/user';
import iconwechat from '../../static/image/share/icon_wechat.png';
import LoginView from '../comps/LoginView';
import CheckIn from './CheckIn';

export default () => {
  const [isOpened, setIsOpened] = useState(false);
  // 用户信息数据结构，和storage中存储的一致
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      userId: '',
      isChecked: false,
      avatarUrl: '',
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
                >
                  微信用户
                </View>
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
          top: '-50rpx',
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
              fetchUserInfo();
            }}
          />
        )}

        <View style={Style.gridContainerStyle}>
          <View style={Style.gridItemStyle}>
            <View
              className="at-icon at-icon-settings"
              style={{
                fontSize: '40rpx',
                width: '40rpx',
                top: '10rpx',
                right: '10rpx',
              }}
              onClick={() => {
                navigateTo({ url: '/pages/album/index' });
              }}
            ></View>
            <View>我的作品</View>
          </View>
          <View style={Style.gridItemStyle}>
            <View
              className="at-icon at-icon-settings"
              style={{
                fontSize: '40rpx',
                width: '40rpx',
                top: '10rpx',
                right: '10rpx',
              }}
              onClick={() => {}}
            ></View>
            <View>我的积分</View>
          </View>
          <View style={Style.gridItemStyle}>
            <View
              className="at-icon at-icon-settings"
              style={{
                fontSize: '40rpx',
                width: '40rpx',
                top: '10rpx',
                right: '10rpx',
              }}
              onClick={() => {}}
            ></View>
            <View>我的签到</View>
          </View>
          <View style={Style.gridItemStyle}>
            <View
              className="at-icon at-icon-settings"
              style={{
                fontSize: '40rpx',
                width: '40rpx',
                top: '10rpx',
                right: '10rpx',
              }}
              onClick={() => {}}
            ></View>
            <View>我的签到</View>
          </View>
          <View
            style={Style.gridItemStyle}
            onClick={() => {
              clearUserInfo();
              setUserInfo({
                isLogin: false,
                data: null,
              });
            }}
          >
            <View
              className="at-icon at-icon-settings"
              style={{
                fontSize: '40rpx',
                width: '40rpx',
                top: '10rpx',
                right: '10rpx',
              }}
            ></View>
            <View>退出登陆</View>
          </View>
        </View>
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

const Style = {
  gridContainerStyle: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '16px',
    margin: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)' /* 3列的网格，每列平均分配宽度 */,
    gap: '16px' /* 网格项之间的间隔 */,
  },

  gridItemStyle: {
    padding: '16px',
    // border: '1px solid #ccc',
    textAlign: 'center',
  },
  cardStyle: {
    margin: '30rpx',
    position: 'relative',
    top: '-200rpx',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    borderRadius: '20rpx',
    padding: '20rpx',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};
