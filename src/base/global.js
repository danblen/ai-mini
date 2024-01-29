import Taro from '@tarojs/taro';

export const initPlatformApi = () => {
  global.setStorageSync = Taro.setStorageSync;
  global.getStorageSync = Taro.getStorageSync;
};
