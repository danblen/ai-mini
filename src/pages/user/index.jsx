/**
 * 用户页
 */
import { Image, View } from '@tarojs/components';
import Taro, { useTabItemTap } from '@tarojs/taro';
import React, { useState } from 'react';
// import CheckIn from "./CheckIn";
// import BuyPoint from "./BuyPoint";
import { get_user_info } from '../../api';
import { wechatLogin } from '../../common/user';
import { AtFloatLayout } from 'taro-ui';
import LoginView from '../comps/LoginView';

export default () => {
  // const [showBuyPointPopup, setShowBuyPointPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      user_id: '',
      is_check: false,
      avatarUrl: 'https://danblen.github.io/static/index.jpg',
    },
  });

  const fetchUserInfo = async () => {
    let userInfo = getStorageSync('userInfo');
    if (userInfo?.isLogin && userInfo.data?.user_id) {
      let res = await get_user_info({
        user_id: userInfo.data.user_id,
      });
      if (res) {
        setUserInfo((pre) => ({
          ...pre,
          isLogin: true,
          data: res.data,
        }));
        setStorageSync('userInfo', {
          isLogin: true,
          data: res.data,
        });
      } else {
        setUserInfo({
          isLogin: false,
          data: {},
        });
      }
    } else {
      setUserInfo({
        isLogin: false,
        data: {},
      });
    }
  };

  useTabItemTap((tab) => {
    fetchUserInfo();
  });
  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: '#f7e9e2',
          height: '400rpx',
          paddingTop: '140rpx',
        }}
      >
        <View className="user-box " style={{}}>
          <Image
            mode="aspectFill"
            className="avatar"
            style={{
              display: 'inline-block',
              position: 'relative',
              top: '10rpx',
              marginLeft: '30rpx',
              borderRadius: '10%',
              width: '150rpx',
              height: '150rpx',
            }}
            src={'https://facei.top/static/pic/123.png'}
          />
          <View
            className=""
            style={{
              display: 'inline-block',
              marginLeft: '50rpx',
            }}
          >
            {userInfo?.isLogin && (
              <View>
                <View
                  style={{
                    fontSize: '40rpx',
                    height: '100rpx',
                    verticalAlign: 'top',
                  }}
                >
                  微信用户
                </View>
                <View className=" ">
                  ID: {userInfo?.data?.user_id?.slice(0, 6) + '****'}
                  <View className="at-icon at-icon-chevron-right" />
                </View>
              </View>
            )}
            {!userInfo?.isLogin && (
              <View
                type="primary"
                style={{
                  position: 'relative',
                  top: '-50rpx',
                  width: '400rpx',
                  fontSize: '40rpx',
                  animation: 'swap 1s infinite',
                }}
                loading={loading}
                onClick={() => setIsOpened(true)}
              >
                微信一键登陆
                <View className="at-icon at-icon-chevron-right" />
              </View>
            )}
          </View>
          <View
            className="at-icon at-icon-settings"
            style={{
              fontSize: '48rpx',
              position: 'absolute',
              top: '200rpx',
              right: '30rpx',
            }}
            onClick={() => {
              Taro.navigateTo({
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
          onClick={() => {}}
        >
          <View
            style={{
              lineHeight: '100rpx',
            }}
          >
            还没签到，去签到
            <View className="at-icon at-icon-chevron-right" />
          </View>
        </View>

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
                Taro.navigateTo({ url: '/pages/album/index' });
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
        </View>
        {/* <View style={Style.cardStyle}>
        <AtList>
          <AtListItem
            title="剩余积分"
            extraText={
              userInfo?.data?.points !== undefined ? userInfo.data.points : 0
            }
          />
          <AtListItem
            title="签到"
            extraText={userInfo?.data.is_check ? '已签到' : '点击签到'}
            onClick={() => {}}
          />
          <AtListItem title="购买次卡" arrow="right" />
          <AtListItem title="问题反馈" />
          <AtListItem title="联系我们" />
          <AtListItem
            title="退出登录"
            onClick={() => {
              setUserInfo({
                isLogin: false,
                data: {},
              });
              setStorageSync('userInfo', {
                isLogin: false,
                data: {},
              });
            }}
          />
        </AtList>
      </View> */}
      </View>
      {/* <BuyPoint />
      <GetPoint /> */}

      <AtFloatLayout
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      >
        <LoginView
          onConfirmLogin={async () => {
            const res = await wechatLogin();
            if (res) {
              setUserInfo({
                isLogin: true,
                data: res.data,
              });
              setStorageSync('userInfo', {
                isLogin: true,
                data: res.data,
              });
              setIsOpened(false);
            }
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
