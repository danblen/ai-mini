import { Button, Image, View } from "@tarojs/components";
import Taro, { useTabItemTap } from "@tarojs/taro";
import React, { useState } from "react";
import LoginModal from "./LoginModal";
// import CheckIn from "./CheckIn";
// import BuyPoint from "./BuyPoint";
import { AtIcon, AtList, AtListItem } from "taro-ui";
import { QueryUserInfoAPI } from "../../api";
import { QueryUserDataAPI, get_user_info } from "../../api";
import { clearUserInfo, wechatLogin } from "../../common/user";

export default () => {
  // const [showBuyPointPopup, setShowBuyPointPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState({
    isLogin: false,
    data: {
      points: 0,
      user_id: "",
      is_check: false,
      avatarUrl: "https://danblen.github.io/static/index.jpg",
    },
  });

  console.log("userInfo2223:", userInfo);

  const fetchUserInfo = async () => {
    let userInfo = Taro.getStorageSync("userInfo");
    if (userInfo?.data?.user_id) {
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
  return (
    <>
      <View
        style={{
          backgroundColor: "transparent",
          marginBottom: "50rpx",
          height: "200rpx",
        }}
      >
        {userInfo?.isLogin ? (
          <View className="user-box ">
            <Image
              mode="aspectFill"
              className="avatar"
              style={{
                display: "inline-block",
                borderRadius: "50%",
                width: "100rpx",
                height: "100rpx",
              }}
              src={"https://danblen.github.io/static/index.jpg"}
            />
            <View
              className=""
              style={{ display: "inline-block", marginLeft: "30rpx" }}
            >
              <View className=" ">微信用户</View>
              <View className=" ">
                ID: {userInfo.data.user_id.slice(0, 6) + "xxxxxx"}
                <AtIcon value="chevron-right" size="20" color="#969799" />
              </View>
            </View>
          </View>
        ) : (
          <View className="">
            <View style={{ textAlign: "center", fontSize: "20px" }}>
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
            Taro.setStorageSync("userInfo", {
              isLogin: false,
              data: {},
            });
          }}
        />
      </AtList>

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
    </>
  );
};
