/**
 * 接口定义文件
 * post data必须为对象比如{userId:''}，否则发不出请求
 */

import { URL_BACK } from './config.js';
import request from './request.js';
export { URL_BACK };

const api = {};
// 登陆接口
api.login = (data) => {
  return request.post('/login', data);
};
api.queryResult = (data) => {
  return request.post('/queryResult', data);
};
api.upload = (data) => {
  return request.upload('/upload', data);
};
api.saveImageToServerApi = (data) => {
  return request.post('/saveImageToServerApi', data);
};
api.enqueue = (data) => {
  return request.post('/enqueue', data);
};
api.update = (data) => {
  return request.post('/update', data);
};
// 获取首页图片
api.getImages = (data) => {
  return request.post('/getImages', data);
};
api.getAppImages = (data) => {
  return request.post('/getAppImages', data);
};
// 用来开发使用的，存储数据到数据库表中
api.storeImages = (data) => {
  return request.post('/storeImages', data);
};
// 创作页上传图片接口
api.uploadImages = (data) => {
  return request.post('/uploadImages', data);
};
api.getTagImages = (data) => {
  return request.post('/getTagImages', data);
};
// 获取用户换脸的所有图片，作品页
api.getUserProcessImage = (data) => {
  return request.post('/getUserProcessImage', data);
};
api.imageIncreaseResolution = (data) => {
  return request.post('/imageIncreaseResolution', data);
};
api.img2img = (data) => {
  return request.post('/img2img', data);
};
api.checkIn = (data) => {
  return request.post('/checkIn', data);
};
api.updateUserInfo = (data) => {
  return request.post('/updateUserInfo', data);
};
// 通过requestId匹配，可传入任意参数
api.updateUserProcessInfo = (data) => {
  return request.post('/updateUserProcessInfo', data);
};
// 通过monentId匹配，可传入任意参数
api.updateImageUserUploadInfo = (data) => {
  return request.post('/updateImageUserUploadInfo', data);
};
api.feedback = (data) => {
  return request.post('/feedback', data);
};
api.getQRCode = (data) => {
  return request.post('/getQRCode', data);
};
api.userlog = (data) => {
  return request.post('/userlog', data);
};
api.uploadLaunchInfo = (data) => {
  return request.post('/uploadLaunchInfo', data);
};
api.img2img = (data) => {
  return request.post('/img2img', data);
};
api.txt2img = (data) => {
  return request.post('/txt2img', data);
};
api.easyPhotoTrainLora = (data) => {
  return request.post('/easyPhotoTrainLora', data);
};
api.easyPhotoSwapFace = (data) => {
  return request.post('/easyPhotoSwapFace', data);
};
api.getUserInfo = (data) => {
  return request.post('/getUserInfo', data);
};
// 获取支付参数
api.getPaymentParams = (data) => {
  return request.post('/getPaymentParams', data);
};
export { api };

// 删除用户所有作品图片
export function delete_all_images(data) {
  return request.post('/deleteAllImages', data);
}
// 删除用户选中作品图片
export function delete_select_images(data) {
  return request.post('/deleteSelectImages', data);
}

// // SD
// export function getConfig(data) {
//   return request.get('/config', data, {
//     isMj: true,
//   });
// }
// export function txt2img(data) {
//   return request.post('/sdapi/v1/txt2img', data);
// }
// export function img2img(data) {
//   return request.post('/sdapi/v1/img2img', img2img1);
// }

// /**
//  * 全局信息
//  */
// export function getCmdFlags(data) {
//   return request.get('/sdapi/v1/cmd-flags', data);
// }

// /**
//  * 获取模型
//  */
// export function getSdModels(data) {
//   return request.get('/sdapi/v1/sd-models', data);
// }
// /**
//  * 获取模板
//  */
// export function getSdLoRA(data) {
//   return request.get(
//     '/file=extensions/a1111-sd-webui-tagcomplete/tags/temp/lora.txt',
//     data
//   );
// }
// /**
//  * 获取采样方法
//  */
// export function getSdSamplers(data) {
//   return request.get('/sdapi/v1/samplers', data);
// }
// /**
//  * 文生图
//  */
// export function postTxt2img(data) {
//   return request.post('/sdapi/v1/txt2img', data);
// }
// /**
//  * 图生文
//  */
// export function postPreprocess(data) {
//   return request.post('/sdapi/v1/preprocess', data);
// }
// /**
//  * 解析文本结果
//  */
// export function getAnalysRes(fileDir, name) {
//   return request.get(`/file=${fileDir}/${name}.txt`);
// }
