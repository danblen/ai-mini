import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Checkbox, Modal } from "@tarojs/components";
import LoginModal from "./LoginModal";
// import CheckIn from "./CheckIn";
// import BuyPoint from "./BuyPoint";
import { AtList, AtListItem, AtIcon } from "taro-ui";
import { wechat_login, get_user } from "../../api";
import { wechatLogin } from "../../common/user";

export default () => {
  // const [showBuyPointPopup, setShowBuyPointPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState({
    points: 10,
    userId: "",
    isCheck: false,
    avatarUrl: "https://danblen.github.io/static/index.jpg",
  });

  const fetchUserInfo = async () => {
    const userInfo = Taro.getStorageSync("userInfo");
    if (userInfo.userId) {
      setUserInfo({
        ...userInfo,
      });
    }
  };

  const onConfirmLogin = async () => {
    const res = await wechatLogin();
    if (res) {
      const updatedUserInfo = {
        points: res.user.points,
        isCheck: res.user.is_check,
        userId: res.user.user_id,
      };
      setUserInfo((preData) => ({
        ...preData,
        ...updatedUserInfo,
      }));
      Taro.setStorageSync("userInfo", updatedUserInfo);
      setIsOpened(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, userInfo);
  return (
    <View>
      <View
        style={{
          backgroundColor: "transparent",
          marginBottom: "50rpx",
          height: "200rpx",
        }}
      >
        {userInfo.userId ? (
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
                ID:{userInfo.userId}
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
        <AtListItem title="剩余积分" extraText={userInfo.points} />
        <AtListItem title="签到" onClick={() => {}} />
        <AtListItem title="购买次卡" arrow="right" />
        <AtListItem title="问题反馈" />
        <AtListItem title="联系我们" />
        <AtListItem
          title="退出登录"
          onClick={() => {
            const emptyInfo = {
              points: 0,
              userId: "",
              isCheck: false,
              avatarUrl: "",
            };
            setUserInfo(emptyInfo);
            Taro.setStorageSync("userInfo", emptyInfo);
          }}
        />
      </AtList>

      {/* <BuyPoint />
      <GetPoint /> */}
      <LoginModal
        isOpened={isOpened}
        onConfirmLogin={onConfirmLogin}
        onClose={() => {
          setIsOpened(false);
        }}
      />
    </View>
  );
};
