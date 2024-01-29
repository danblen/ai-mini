import Taro from '@tarojs/taro';
global.userInfo = {
  isLogin: false,
  data: {
    points: 0,
    ischeck: false,
    userId: '',
    code: '',
  },
};
global.setStorageSync = Taro.setStorageSync;
global.getStorageSync = Taro.getStorageSync;
