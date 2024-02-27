import Taro from '@tarojs/taro';

export const setStorageSync = Taro.setStorageSync;
export const getStorageSync = Taro.getStorageSync;
export const getStorage = (key) =>
  new Promise((resolve) => {
    Taro.getStorage({
      key,
      success: (res) => {
        resolve(res.data);
      },
    });
  });
export const setStorage = (key, data) => Taro.setStorage({ key, data });
export const navigateTo = Taro.navigateTo;
export const initPlatformApi = () => {};

export const initParams = () => {
  global.isMini = true;
  global.isApp = false;
  global.isAndorid = false;
  global.isIOS = false;
};
