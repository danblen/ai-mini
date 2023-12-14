import React, { useState, useEffect } from "react";
import Taro, { useTabItemTap } from "@tarojs/taro";
import { View, Text, Button, Image, Checkbox, Modal } from "@tarojs/components";
import LoginModal from "./LoginModal";
// import CheckIn from "./CheckIn";
// import BuyPoint from "./BuyPoint";
import { AtList, AtListItem, AtIcon } from "taro-ui";
import { wechat_login, get_user } from "../../api";
import {
  wechatLogin,
  getUpdatedUserInfo,
  clearUserInfo,
} from "../../common/user";

export default () => {
  // const [showBuyPointPopup, setShowBuyPointPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState({
    data: {
      points: 10,
      user_id: "",
      is_check: false,
      avatarUrl: "https://danblen.github.io/static/index.jpg",
    },
  });

  const fetchUserInfo = async () => {
    const userInfo = await getUpdatedUserInfo();
    console.log(userInfo);
    if (userInfo) {
      setUserInfo(userInfo);
    }
  };

  // useEffect(() => {
  //   fetchUserInfo();
  // }, userInfo);
  useTabItemTap(() => {
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
                ID:{userInfo.data.user_id}
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
        <AtListItem title="剩余积分" extraText={userInfo?.data.points || ""} />
        <AtListItem title="签到" onClick={() => {}} />
        <AtListItem title="购买次卡" arrow="right" />
        <AtListItem title="问题反馈" />
        <AtListItem title="联系我们" />
        <AtListItem
          title="退出登录"
          onClick={() => {
            clearUserInfo();
            setUserInfo(null);
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
            setUserInfo(res);
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
