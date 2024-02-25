export const URL_SD = 'https://facei.top';
// 线上后台服务使用此配置
export const URL_BACK = 'https://facei.top/v1';
export const URL_STATIC = 'https://facei.top/static';
// 测试环境开发使用此配置
// export const URL_BACK = 'https://facei.top/test';
// export const URL_STATIC = 'https://facei.top/statictest';
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
