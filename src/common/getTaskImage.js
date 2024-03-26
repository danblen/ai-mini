import { api, getSwapQueueResult } from '../api/index.js';
import { getStorageSync } from '../base/global.js';

let timers = {};
export const getTaskImage = async (requestId) => {
  return new Promise((resolve, reject) => {
    // const storageUserInfo = getStorageSync('userInfo');
    // const requestData = {
    //   userId: storageUserInfo?.data?.userId,
    //   requestId: requestId,
    //   sql_query: {
    //     request_status: '',
    //     userId: '',
    //   },
    // };

    let counter = 0; // 添加计数器
    const maxCounter = 20; // 设置最大计数值，相当于查询次数

    const checkStatus = async () => {
      try {
        // let res = await getSwapQueueResult(requestData);
        let res = await api.queryResult({ requestId });

        if (res?.data?.status === 'finishing') {
          clearInterval(timers[requestId]);
          resolve(res);
        } else {
          // 如果任务还未完成，则增加计数器
          counter++;
          // 如果计数器超过最大值，则提示超时并停止定时器
          if (counter >= maxCounter) {
            clearInterval(timers[requestId]);
            reject('Task timeout');
          }
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
