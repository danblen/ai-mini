import { getSwapQueueResult } from '../api/index.js';
import Taro from '@tarojs/taro';

let timers = {};
export const getTaskImage = async (requestId) => {
  return new Promise((resolve, reject) => {
    const storageUserInfo = getStorageSync('userInfo');
    const requestData = {
      userId: storageUserInfo?.data?.userId,
      requestId: requestId,
      sql_query: {
        request_status: '',
        userId: '',
      },
    };

    const checkStatus = async () => {
      try {
        let res = await getSwapQueueResult(requestData);
        if (res.data.status === 'finishing') {
          clearInterval(timers[requestId]);
          resolve(res);
        }
      } catch (error) {
        resolve(null);
        clearInterval(timers[requestId]);
      }
    };

    // 立即调用一次
    checkStatus();

    // 设置定时器，每隔3秒调用一次checkStatus
    timers[requestId] = setInterval(checkStatus, 3000);
  });
};

export const clearTimers = () => {
  Object.keys(timers).forEach((key) => {
    clearInterval(timers[key]);
  });
};
