import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Button, Image, Checkbox, Modal } from "@tarojs/components";
import CheckIn from "./CheckIn";
import BuyPoint from "./BuyPoint";
import { wechat_login, get_user } from "../../api";

export default () => {
  const [showBuyPointPopup, setShowBuyPointPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCheckPolicy, setIsCheckPolicy] = useState(false);
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

  return (
    <View>
      <View style={{ backgroundColor: "transparent" }}>
        {userInfo.userId ? (
          <View className="user-box"></View>
        ) : (
          <View className="user-box"></View>
        )}
      </View>

      <BuyPoint />
      <GetPoint />
    </View>
  );
};
