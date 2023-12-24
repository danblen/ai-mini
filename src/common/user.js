import Taro from "@tarojs/taro";
import { wechat_login, get_user } from "../api";

export const wechatLogin = () =>
  new Promise((resolve, reject) => {
    Taro.getUserInfo({
      success: (res) => {
        // 调用微信登录接口
        Taro.login({
          success: async (loginRes) => {
            if (loginRes.code) {
              // 登录成功，获取到用户的 code
              // 向服务器发送 code
              let wechatRes = await wechat_login({ code: loginRes.code });
              // let userInfo = {
              //   code: loginRes.code,
              //   data: wechatRes.data,
              // isLogin: true,
              // };
              // Taro.setStorageSync("userInfo", userInfo);
              // userInfo = Taro.getStorageSync("userInfo");
              // console.log(111, userInfo);
              resolve(wechatRes);
            } else {
              // 登录失败
              console.log("登录失败", loginRes);
            }
          },
          fail: (loginError) => {
            resolve(null);
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

export const getUser = async () => {
  try {
    const userInfo = Taro.getStorageSync("userInfo");
    if (!userInfo) {
      return null;
    }
    const response = await get_user(userInfo.userId);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
export const getUserInfo = async () => {
  try {
    const userInfo = Taro.getStorageSync("userInfo");
    if (!userInfo) return null;
    return userInfo;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
export const setUserInfo = async (updatedUserInfo) => {
  try {
    Taro.setStorageSync({
      key: "userInfo",
      data: updatedUserInfo,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
export const getUpdatedUserInfo = async () => {
  try {
    const userInfo = Taro.getStorageSync("userInfo");
    if (!userInfo) {
      return null;
    }
    const user = await getUser();
    userInfo.data = user;
    Taro.setStorageSync({
      key: "userInfo",
      data: userInfo,
    });
    return userInfo;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const clearUserInfo = async () => {
  Taro.setStorageSync({ key: "userInfo", data: null });
};
