import { getSwapQueueResult } from "../api/index.js";
let timers = {};
export const getTaskImage = async (requestId) => {
  return new Promise((resolve, reject) => {
    const requestData = {
      user_id: "",
      request_id: requestId,
      sql_query: {
        request_status: "",
        user_id: "",
      },
    };

    const checkStatus = async () => {
      try {
        let res = await getSwapQueueResult(requestData);
        if (res.status === "finishing") {
          clearInterval(timers[requestId]);
          resolve(res);
        }
      } catch (error) {
        clearInterval(timers[requestId]);
        reject();
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
