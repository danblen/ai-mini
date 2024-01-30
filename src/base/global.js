import Taro from '@tarojs/taro';

export const initPlatformApi = () => {
  global.setStorageSync = Taro.setStorageSync;
  global.getStorageSync = Taro.getStorageSync;
  global.getStorage = Taro.getStorage;
  global.setStorage = Taro.setStorage;
  global.navigateTo = Taro.navigateTo;
};

export const initParams = () => {
  global.isMini = true;
  global.isApp = false;
  global.isAndorid = false;
  global.isIOS = false;
};
