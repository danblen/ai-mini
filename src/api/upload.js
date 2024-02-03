import Taro from '@tarojs/taro';
import { URL_BACK } from './config';

// 封装上传文件的函数
export const uploadFile = (url, filePath, data, name) => {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: URL_BACK + url,
      filePath: filePath,
      // formData: data,
      name: 'file',
      success: (res) => {
        // if (res.statusCode === 200) {
        debugger;
        resolve(res);
        // } else {
        //   reject(
        //     new Error(`Failed to upload file. Status code: ${res.statusCode}`)
        //   );
        // }
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};
