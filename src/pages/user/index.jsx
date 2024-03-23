/**
 * 用户页
 */
import {
  Image,
  Text,
  View,
  Input,
  Button,
  Radio,
  RadioGroup,
} from '@tarojs/components';
import Taro, { useDidShow, useTabItemTap } from '@tarojs/taro';
import React, { useEffect, useState } from 'react';
import { AtFloatLayout } from 'taro-ui';
import { api, get_user_info } from '../../api';
import { navigateTo } from '../../base/global';
import {
  clearUserInfo,
  fetchUserInfo,
  saveUserInfo,
  updateUserInfoFromApi,
  updateUserInfoFromStorage,
} from '../../common/user';
import LoginView from '../comps/LoginView';
import CheckIn from './CheckIn';
import ButtonView from './ButtonView';
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from 'taro-ui';
import { URL_STATIC } from '../../api/config';
import { PAGES } from '../../const/app';
import UploadDigital from '../UploadDigital';
const iconwechat = URL_STATIC + '/appstatic/image/share/icon_wechat.png';
const buttonImages = URL_STATIC + '/appstatic/image/my/userPicToast.jpg';

export default () => {
  const [isOpenedText, setIsOpenedText] = useState(false);
  const [nickname, setNickname] = useState(null);
  const [gender, setGender] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const [editDigitalMode, setEditDigitalMode] = useState(true);
  const [trainStatus, setIsTrainStatus] = useState('');
  // 用户信息数据结构，和storage中存储的一致
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      userId: '',
      isChecked: false,
      avatarUrl: '',
      userName: '输入昵称',
      userGender: '',
    },
  });
  useEffect(() => {
    updateUserInfoFromStorage();
  }, []);
  // 获取用户信息

  const getUserInfo = async () => {
    let res = await updateUserInfoFromApi();
    // 所有接口都可通过这种方式判断调用成功与否
    if (res?.data) {
      setUserInfo((pre) => ({
        ...pre,
        isLogin: true,
        data: res.data,
      }));
      // if (res?.data?.loraPic) {
      //   setEditDigitalMode(false);
      // }
      if (res?.data?.userGender) {
        setGender(res.data.userGender);
      }
      console.log(res.data);
      setIsTrainStatus(res?.data?.loraStatus);
      // if (res?.data?.loraStatus === 'pending') {
      //   setIsTrainStatus(true);
      // } else {
      //   setIsTrainStatus(false);
      // }
    } else {
      // 获取用户数据失败
      setUserInfo({
        isLogin: false,
        data: {},
      });
    }
  };
  // 每次点击到tabbar 我的 都会触发，更新用户信息并刷新页面
  useTabItemTap((tab) => {});
  useDidShow(() => {
    getUserInfo();
  });

  const handleNicknameClick = () => {
    setIsOpenedText(true);
  };

  const handleCancel = async () => {
    setIsOpenedText(false);
  };
  const handleClose = async () => {
    setIsOpenedText(false);
  };
  const handleConfirm = async () => {
    // 关闭弹窗
    if (nickname != null && gender != '') {
      setIsOpenedText(false);
      if (userInfo.isLogin) {
        const res = await api.updateUserInfo({
          userId: userInfo.data.userId,
          userName: nickname,
          userGender: gender,
        });
        if (res?.data) {
          getUserInfo();
        }
      }
    } else {
      Taro.showToast({ title: '请输入昵称/性别', icon: 'none' });
    }
  };
  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: '#f7e9e2',
          height: '160px',
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
                  {userInfo?.data?.userName || '输入昵称'}
                </View>
                <AtModal
                  isOpened={isOpenedText}
                  onClose={handleClose}
                  onCancel={handleCancel}
                  onConfirm={handleConfirm}
                >
                  <AtModalHeader>数字人属性</AtModalHeader>
                  <AtModalContent>
                    {isOpenedText && (
                      <React.Fragment>
                        <View style={{ marginBottom: '10px' }}>
                          <Text>昵称：</Text>
                          <Input
                            style={{
                              border: '1px solid #ccc',
                              padding: '5px',
                              borderRadius: '4px',
                            }}
                            placeholder="请输入昵称"
                            value={nickname}
                            onInput={(e) => setNickname(e.detail.value)}
                          />
                        </View>
                        <View style={{ marginBottom: '10px' }}>
                          <Text>性别：</Text>
                          <RadioGroup
                            onChange={(e) => setGender(e.detail.value)}
                            value={gender}
                          >
                            <Radio value="male">男</Radio>
                            <Radio value="female">女</Radio>
                          </RadioGroup>
                        </View>
                      </React.Fragment>
                    )}
                  </AtModalContent>
                  <AtModalAction>
                    <Button
                      onClick={() => handleCancel()}
                      style={{
                        backgroundColor: '#999',
                        color: '#fff',
                        margin: '5px',
                        borderRadius: '10px',
                      }}
                    >
                      取消
                    </Button>
                    <Button
                      onClick={() => handleConfirm()}
                      style={{
                        backgroundColor: '#6190E8',
                        color: '#fff',
                        margin: '5px',
                        borderRadius: '10px',
                      }}
                    >
                      确定
                    </Button>
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
                url: PAGES.setting,
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
          editDigital={() => {
            if (editDigitalMode) setEditDigitalMode(false);
            else setEditDigitalMode(true);
          }}
        />
        <UploadDigital
          isLogin={userInfo?.isLogin || null}
          isHaveUserGender={userInfo?.data?.userGender || null}
          digitalUser={
            userInfo?.data?.loraPic
              ? URL_STATIC + userInfo.data.loraPic
              : buttonImages
          }
          editDigitalMode={editDigitalMode}
          trainStatus={trainStatus}
          onLoginOpened={(login) => {
            setIsOpened(login);
          }}
          onNickOpened={(login) => {
            setIsOpenedText(login);
          }}
          isTrainDone={userInfo?.data?.loraPic ? 1 : 0}
        ></UploadDigital>
        {/* 支付接口 */}
        {/* <Button
          type="primary"
          onClick={async () => {
            const paymentParams = await api.getPaymentParams({ amount: 0.1 }); // Request payment parameters from server
            Taro.requestPayment({
              timeStamp: paymentParams.timeStamp,
              nonceStr: paymentParams.nonceStr,
              package: paymentParams.package,
              signType: 'MD5',
              paySign: paymentParams.paySign,
              success: function (res) {
                Taro.showToast({
                  title: 'Payment successful',
                  icon: 'success',
                });
              },
              fail: function (res) {
                Taro.showToast({ title: 'Payment failed', icon: 'none' });
              },
            });
          }}
        >
          WeChat Pay 0.1 RMB
        </Button> */}
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
