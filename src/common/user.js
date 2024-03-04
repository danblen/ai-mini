import Taro from '@tarojs/taro';
import { api } from '../api';
import { getStorage, setStorage } from '../base/global';

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
              let wechatRes = await api.login({ code: loginRes.code });
              resolve(wechatRes);
            } else {
              // 登录失败
              console.log('登录失败', loginRes);
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
        console.log('用户拒绝了授权', error);
      },
    });
  });

export const clearStorageUserInfo = async () => {
  await setStorage('userInfo', {
    isLogin: false,
    data: {
      points: 0,
      ischeck: false,
      userId: '',
      code: '',
    },
  });
};
export const clearGlobalUserInfo = () => {
  global.userInfo = {
    isLogin: false,
    data: {
      points: 0,
      ischeck: false,
      userId: '',
      code: '',
    },
  };
};
export const clearUserToken = async () => {
  global.userToken = null;
  await setStorage('userToken', null);
};
export const clearUserInfo = () => {
  clearGlobalUserInfo();
  clearStorageUserInfo();
  clearUserToken();
};
export const updateUserInfoFromStorage = async () => {
  const userInfo = await getStorage('userInfo');
  await saveUserInfo(userInfo);
};
export const saveUserInfo = async (userInfo) => {
  global.userInfo = userInfo;
  await setStorage('userInfo', userInfo);
};
export const updateUserTokenFromStorage = async () => {
  const userToken = await getStorage('userToken');
  await saveUserToken(userToken);
};
export const saveUserToken = async (userToken) => {
  global.userToken = userToken;
  await setStorage('userToken', userToken);
};
// export const getUser = async () => {
//   try {
//     const userInfo = getStorageSync('userInfo');
//     if (!userInfo) {
//       return null;
//     }
//     const response = await get_user(userInfo.userId);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };
// export const getUserInfo = async () => {
//   try {
//     const userInfo = getStorageSync('userInfo');
//     if (!userInfo) return null;
//     return userInfo;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };
// export const getUpdatedUserInfo = async () => {
//   try {
//     const userInfo = getStorageSync('userInfo');
//     if (!userInfo) {
//       return null;
//     }
//     const user = await getUser();
//     userInfo.data = user;
//     setStorageSync({
//       key: 'userInfo',
//       data: userInfo,
//     });
//     return userInfo;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };
