// 在用户完成任务后，触发获取用户授权的操作
export function getUserAuthorization(tmplIds) {
  wx.requestSubscribeMessage({
    tmplIds, // 需要订阅的模板消息 ID 列表
    success(res) {},
    fail(err) {
      console.error('获取用户授权失败', err);
    },
  });
}

export const getTaskNotifyAuth = () => {
  getUserAuthorization(['yI6xwoMfz8rcuHI5NpC3IO_d3Ge2a-Pya8O4-EK-qtw']);
};
export function checkTemplateMessageAuthorization(templateId, callback) {
  wx.getSetting({
    success(res) {
      if (res.authSetting[`scope.${templateId}`]) {
        callback && callback(true); // 用户已经授权该模板消息的权限
      } else {
        callback && callback(false); // 用户未授权该模板消息的权限
      }
    },
    fail(err) {
      console.error('获取用户授权设置失败', err);
      callback && callback(false); // 获取用户授权设置失败，也视为未授权
    },
  });
}

// 示例调用
const templateId = 'yI6xwoMfz8rcuHI5NpC3IO_d3Ge2a-Pya8O4-EK-qtw';
checkTemplateMessageAuthorization(templateId, (authorized) => {
  if (authorized) {
    console.log('用户已经授权该模板消息的权限');
  } else {
    console.log('用户未授权该模板消息的权限');
  }
});
