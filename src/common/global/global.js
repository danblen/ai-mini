export const initGlobalParams = () => {
  // 初始化用户信息，存放到全局变量中
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
