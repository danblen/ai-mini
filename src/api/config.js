// export const SERVER_HOST = process.env.SERVER_HOST;
export const SERVER_HOST = 'https://facei.top';
// 线上后台服务使用此配置
export const URL_BACK = `${SERVER_HOST}/v1`;
export const URL_STATIC = `${SERVER_HOST}/static'`;
// 测试环境开发使用此配置
// export const URL_BACK =  `${SERVER_HOST}/test`;
// export const URL_STATIC =  `${SERVER_HOST}/statictest`;
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
