import React, { useState } from "react";
import { View, Text, Button, Checkbox } from "@tarojs/components";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui";
import { wechat_login } from "../../api/index.js";
import Taro from "@tarojs/taro";
import { wechatLogin } from "../../common/user";

export default ({ isOpened, onConfirmLogin, onClose }) => {
  const [isCheckPolicy, setIsCheckPolicy] = useState(true);
  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    points: 0,
    isCheck: false,
    userId: "",
  });

  const showToast = (message) => {};

  return (
    <AtModal isOpened={isOpened} onClose={onClose}>
      <AtModalHeader>欢迎登录</AtModalHeader>
      <AtModalContent>
        <View style={{ marginTop: "40rpx" }}>
          <Button
            type="primary"
            style={{
              position: "relative",
              animation: "swap 1s infinite",
              width: "92%",
            }}
            shape="circle"
            className="swap"
            loading={loading}
            onClick={() => {
              if (!isCheckPolicy) {
                Taro.showToast({
                  title: "请勾选我已阅读并同意《服务协议》和《隐私协议》",
                  icon: "none",
                  duration: 2000,
                });
                return;
              }
              onConfirmLogin();
            }}
          >
            微信授权登录
          </Button>
          <View style={{ fontSize: "24rpx", margin: "40rpx 0" }}>
            <Checkbox
              checked={isCheckPolicy}
              onClick={() => setIsCheckPolicy(!isCheckPolicy)}
            ></Checkbox>
            <Text>我已阅读并同意</Text>
            <Text style={{ color: "blue" }} onClick={() => {}}>
              《服务协议》
            </Text>
            和
            <Text style={{ color: "blue" }} onClick={() => {}}>
              《隐私协议》
            </Text>
          </View>
        </View>
      </AtModalContent>
      <AtModalAction>
        <Button onClick={onClose}>取消</Button>
      </AtModalAction>
    </AtModal>
  );
};
