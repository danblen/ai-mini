import Taro from "@tarojs/taro";
import { wechat_login } from "../api";

export const wechatLogin = () =>
  new Promise((resolve, reject) => {
    Taro.getUserInfo({
      success: (res) => {
        // 调用微信登录接口
        Taro.login({
          success: async (loginRes) => {
            if (loginRes.code) {
              // 登录成功，获取到用户的 code
              Taro.setStorageSync("userCode", loginRes.code);
              // Taro.setStorageSync('userInfo', res.userInfo);
              // 向服务器发送 code
              let wechatRes = await wechat_login({ code: loginRes.code });
              Taro.setStorageSync("userInfo", wechatRes.user);

              resolve(wechatRes);
            } else {
              // 登录失败
              console.log("登录失败", loginRes);
            }
          },
          fail: (loginError) => {
            // 登录失败
            console.log("登录失败", loginError);
            reject(loginError);
          },
        });
      },
      fail: (error) => {
        // 用户拒绝了授权
        reject(error);
        console.log("用户拒绝了授权", error);
      },
    });
  });
