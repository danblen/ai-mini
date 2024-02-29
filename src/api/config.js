export const TARO_APP_SERVER_HOST = process.env.TARO_APP_SERVER_HOST;
export const TARO_APP_URL_BACK = process.env.TARO_APP_URL_BACK;
export const TARO_APP_URL_STATIC = process.env.TARO_APP_URL_STATIC;
export const TARO_APP_URL_BACK_TEST = process.env.TARO_APP_URL_BACK_TEST;
export const TARO_APP_URL_STATIC_TEST = process.env.TARO_APP_URL_STATIC_TEST;
// 线上后台服务使用此配置
export const URL_BACK = TARO_APP_URL_BACK;
export const URL_STATIC =TARO_APP_URL_STATIC;
// 测试环境开发使用此配置
// export const URL_BACK =  TARO_APP_URL_BACK_TEST;
// export const URL_STATIC =  TARO_APP_URL_STATIC_TEST;
// 本地开发使用此配置
// export const URL_BACK = 'http://localhost:8081';
export const HEADER = {
  'content-type': 'application/json',
  'Form-type':
    navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
      ? 'wechat'
      : 'h5',
  'Form-type': 'routine',
  'Form-type': 'app',
};
