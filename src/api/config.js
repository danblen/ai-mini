let URL_SD = "https://facei.top";
let URL_BACK = "https://facei.top";

module.exports = {
  URL_SD,
  URL_BACK,
  HEADER: {
    "content-type": "application/json",
    //#ifdef H5
    "Form-type":
      navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1
        ? "wechat"
        : "h5",
    //#endif
    //#ifdef MP
    "Form-type": "routine",
    //#endif
    //#ifdef APP-PLUS
    "Form-type": "app",
    //#endif
  },
  // 回话密钥名称 请勿修改此配置
  TOKENNAME: "token",
  // MJ任务进度间隔
  TIMER_FETCH_INTERVAL: 10000,
  // 任务重试次数
  FETCH_REPEAT_COUNT: 30,
};
