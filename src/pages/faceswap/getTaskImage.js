import { getSwapQueueResult } from "../../api/index.js";
let timers = {};
export const getTaskImage = async (requestId) => {
  return new Promise((resolve, reject) => {
    // 创建一个计时器，每隔3秒执行一次
    timers[requestId] = setInterval(async () => {
      const requestData = {
        user_id: "",
        request_id: requestId,
        sql_query: {
          request_status: "",
          user_id: "",
        },
      };

      try {
        // 调用getSwapQueueResult函数获取结果
        let res = await getSwapQueueResult(requestData);

        if (res.status === "finishing") {
          // 更新图像数组中对应请求的图像状态和数据
          resolve(res);
          clearInterval(timers[requestId]);
        }
      } catch (error) {
        reject();
        clearInterval(timers[requestId]);
      }
    }, 3000);
  });
};
export const clearTimers = () => {
  Object.keys(timers).forEach((key) => {
    clearInterval(timers[key]);
  });
};
