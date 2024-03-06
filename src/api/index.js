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
// 获取banner图
api.getBanners = (data) => {
  return request.post('/getBanners', data);
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

export { api };

// 换脸接口
export function faceSwap(data) {
  return request.post('/queueProcess', data, { auth: true });
}

// 获取换脸结果
export function getSwapQueueResult(data) {
  return request.post('/queryResult', data);
}

// 获取首页所有图片
export function get_all_images() {
  return request.post('/getAllImages', null, { auth: true });
}
// 删除用户所有作品图片
export function delete_all_images(data) {
  return request.post('/deleteAllImages', data);
}
// 删除用户选中作品图片
export function delete_select_images(data) {
  return request.post('/deleteSelectImages', data);
}
export function getPhotoData(data) {
  return request.post('/sdapi/v1/query-photo-image-sql-data-by-dict', data);
}
export function getPhotoPath(path) {
  return request.post(`/list-files?path=${encodeURIComponent(path)}`);
}

/* 可通过字典查询UserSqlData数据
@data(dict):可选匹配特征：
            userId             = Integer
            main_image_path     = String
            roop_image_path     = String
            output_image_path   = String
            created_at          = DateTime
            befor_process_time  = Float
            process_time        = Float
            image_type          = String
            request_id          = String
            request_status      = String
*/
export function QueryUserDataAPI(data) {
  return request.post('/query-user-process-data', data);
}
// export function QueryUserPcocessDataAPI(data) {
//   return request.post('/query-user-process-data', data);
// }
export function get_user_info(data) {
  return request.post('/getUserInfo', data);
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
