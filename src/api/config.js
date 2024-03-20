import {
  TARO_APP_URL_BACK,
  TARO_APP_URL_BACK_DEV,
  TARO_APP_URL_BACK_TEST,
  TARO_APP_URL_STATIC,
  TARO_APP_URL_STATIC_TEST,
} from '../config';

// 线上后台服务使用此配置
// export const URL_BACK = TARO_APP_URL_BACK;
// export const URL_STATIC = TARO_APP_URL_STATIC;
// 测试环境开发使用此配置
// export const URL_BACK = TARO_APP_URL_BACK_TEST;
// export const URL_STATIC = TARO_APP_URL_STATIC_TEST;
// 本地开发使用此配置
export const URL_BACK = TARO_APP_URL_BACK_DEV;
export const URL_STATIC = TARO_APP_URL_STATIC;
export const HEADER = {
  'content-type': 'application/json',
  'Form-type':
    navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
      ? 'wechat'
      : 'h5',
  'Form-type': 'routine',
  'Form-type': 'app',
};
