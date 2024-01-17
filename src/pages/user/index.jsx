import { Button, Image, View } from "@tarojs/components";
import Taro, { useTabItemTap } from "@tarojs/taro";
import React, { useState } from "react";
import LoginModal from "./LoginModal";
// import CheckIn from "./CheckIn";
// import BuyPoint from "./BuyPoint";
import { AtIcon, AtList, AtListItem } from "taro-ui";
import { get_user_info } from "../../api";
import { wechatLogin } from "../../common/user";
import { updateUserInfo } from "../../api";

export default () => {
  // const [showBuyPointPopup, setShowBuyPointPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      user_id: "",
      is_check: 0,
      avatarUrl: "https://facei.top/static/pic/123.png",
    },
  });

  const fetchUserInfo = async () => {
    let userInfo = Taro.getStorageSync("userInfo");
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
        Taro.setStorageSync("userInfo", {
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

  const handleCheckIn = async (userInfo) => {
    let res = await updateUserInfo({
      points: userInfo.data.points + 10,
      user_id: userInfo.data.user_id,
      is_check: 1,
    });
    if (res) {
      setUserInfo((pre) => ({
        ...pre,
        isLogin: true,
        data: res,
      }));
    } else {
      console.error("更新用户信息失败，res 或 res.data 不存在。", res);
    }
  };

  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: " #ecf0f1",
          height: "400rpx",
          paddingTop: "40rpx",
        }}
      >
        {userInfo?.isLogin ? (
          <View className="user-box " style={{}}>
            <Image
              mode="aspectFill"
              className="avatar"
              style={{
                display: "inline-block",
                position: "relative",
                top: "10rpx",
                marginLeft: "30rpx",
                borderRadius: "10%",
                width: "150rpx",
                height: "150rpx",
              }}
              src={"https://facei.top/static/pic/123.png"}
            />
            <View
              className=""
              style={{
                display: "inline-block",
                marginLeft: "50rpx",
              }}
            >
              <View
                style={{
                  fontSize: "40rpx",
                  height: "100rpx",
                  verticalAlign: "top",
                }}
              >
                微信用户
              </View>
              <View className=" ">
                ID: {userInfo.data.user_id.slice(0, 6) + "****"}
                <AtIcon value="chevron-right" size="20" color="#969799" />
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              paddingTop: "20rpx",
            }}
          >
            <View
              style={{
                textAlign: "center",
                fontSize: "40rpx",
              }}
            >
              欢迎来到AI写真
            </View>
            <Button
              type="primary"
              style={{
                position: "relative",
                width: "40%",
                animation: "swap 1s infinite",
              }}
              loading={loading}
              onClick={() => setIsOpened(true)}
            >
              微信一键登陆
            </Button>
          </View>
        )}
      </View>

      <View style={Style.cardStyle}>
        <AtList>
          <AtListItem
            title="剩余积分"
            extraText={
              userInfo?.data?.points !== undefined ? userInfo.data.points : 0
            }
          />
          <AtListItem
            title="签到"
            extraText={userInfo?.data.is_check ? "已签到" : "点击签到"}
            onClick={() => {
              if (userInfo.isLogin && !userInfo?.data.is_check) {
                handleCheckIn(userInfo);
              }
            }}
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
              Taro.setStorageSync("userInfo", {
                isLogin: false,
                data: {},
              });
            }}
          />
        </AtList>
      </View>

      {/* <BuyPoint />
      <GetPoint /> */}
      <LoginModal
        isOpened={isOpened}
        onConfirmLogin={async () => {
          const res = await wechatLogin();
          if (res) {
            setUserInfo({
              isLogin: true,
              data: res.data,
            });
            Taro.setStorageSync("userInfo", {
              isLogin: true,
              data: res.data,
            });
            setIsOpened(false);
          }
        }}
        onClose={() => {
          setIsOpened(false);
        }}
      />
    </View>
  );
};

const Style = {
  cardStyle: {
    margin: "30rpx",
    position: "relative",
    top: "-200rpx",
    border: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    borderRadius: "20rpx",
    padding: "20rpx",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};
