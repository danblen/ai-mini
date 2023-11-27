import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Checkbox, Modal } from "@tarojs/components";
import LoginModal from "./LoginModal";
// import CheckIn from "./CheckIn";
// import BuyPoint from "./BuyPoint";
import { AtList, AtListItem } from "taro-ui";
// import { wechat_login, get_user } from "../../api";

export default () => {
  // const [showBuyPointPopup, setShowBuyPointPopup] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [isCheckPolicy, setIsCheckPolicy] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [userInfo, setUserInfo] = useState({
    points: 10,
    userId: "",
    isCheck: false,
    avatarUrl: "",
  });

  const fetchUserInfo = async () => {
    const userId = Taro.getStorageSync("userInfo").userId;
    if (userId) {
      const res = await getUser({ user_id: userId });
      if (res) {
        setUserInfo({
          ...userInfo,
          userId: res.user.user_id,
          points: res.user.points,
          isCheck: res.user.is_check,
        });
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const onClick = () => {};
  const loading = false;
  const onLogin = () => {
    setIsOpened(true);
  };
  return (
    <View>
      <View style={{ backgroundColor: "transparent", marginBottom: "50rpx" }}>
        {userInfo.userId ? (
          <View className="user-box u-flex u-p-l-30 u-p-r-20 u-p-b-30">
            <View className="u-m-r-10">
              {/* <Avatar
                  className="avatar"
                  size="large"
                  image={userInfo.avatarUrl}
                /> */}
            </View>

            <View className="u-flex-1">
              <Text className="u-font-18 u-p-b-20">微信用户</Text>
              <Text className="u-font-14 u-tips-color">
                ID:{userInfo.userId}
              </Text>
            </View>

            <View className="u-m-l-10 u-p-10">
              {/* <AtIcon value="chevron-right" size="28" color="#969799" /> */}
            </View>
          </View>
        ) : (
          <View className="user-box u-p-l-30 u-p-r-20 u-p-b-40">
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
              onClick={onLogin}
            >
              微信一键登陆
            </Button>
          </View>
        )}
      </View>

      <AtList>
        <AtListItem title="剩余次数" />
        <AtListItem title="签到" onClick={onClick} />
        <AtListItem title="购买次卡" arrow="right" />
        <AtListItem title="问题反馈" />
        <AtListItem title="联系我们" />
        <AtListItem title="退出登录" />
      </AtList>

      {/* <BuyPoint />
      <GetPoint /> */}
      <LoginModal
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      />
    </View>
  );
};
