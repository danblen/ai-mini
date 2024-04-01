import { getStorage, setStorage } from '../base/global';

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

export const getTaskNotifyAuth = async () => {
  const hasAuth = await getStorage('taskNotifyAuth');
  if (hasAuth) {
    return;
  }
  checkTemplateMessageAuthorization(
    'yI6xwoMfz8rcuHI5NpC3IO_d3Ge2a-Pya8O4-EK-qtw',
    (authorized) => {
      if (authorized) {
        console.log('用户已经授权该模板消息的权限');
        setStorage('taskNotifyAuth', true);
      } else {
        getUserAuthorization(['yI6xwoMfz8rcuHI5NpC3IO_d3Ge2a-Pya8O4-EK-qtw']);
      }
    }
  );
};
export function checkTemplateMessageAuthorization(tmplId, callback) {
  wx.getSetting({
    withSubscriptions: true, // 启用订阅消息的权限信息
    success(res) {
      if (res.subscriptionsSetting && res.subscriptionsSetting.itemSettings) {
        const templateAuth = res.subscriptionsSetting.itemSettings[tmplId];
        if (templateAuth === 'accept') {
          // 用户已经授权该模板消息的权限
          callback(true);
        } else {
          // 用户未授权该模板消息的权限
          callback(false);
        }
      } else {
        // 用户未曾订阅过任何消息
        callback(false);
      }
    },
    fail(err) {
      console.error('获取用户订阅消息设置失败', err);
      // 默认为未授权
      callback(false);
    },
  });
}
