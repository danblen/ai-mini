import Taro from '@tarojs/taro';
import { Component } from 'react';
import 'taro-ui/dist/style/components/index.scss';
import { api } from './api';
import './app.scss';
import { initApp } from './common/initApp';
class App extends Component {
  constructor(props) {
    super(props);
    initApp();
    Taro.getApp().globalData = {
      clickCount: 0,
      updateGlobalClickCount: (value) => {
        Taro.getApp().globalData.clickCount += value;
      },
    };
  }
  onLaunch(options) {
    // 扫调微信接口生成的二维码（特殊的二维码）进入小程序，获取参数
    if (options.query.scene) {
      console.log('启动参数：', options);
      // 在这里处理扫码后的参数，比如解析 scene，提取用户信息
      // 例如：scene 中包含 shareUserId=123，提取出来
      const launchInfo = {
        userId: global.userInfo?.data?.userId,
        params: {},
      };
      const scene = decodeURIComponent(options.query.scene); // 获取到二维码原始链接内容
      scene.split('&')?.forEach((item) => {
        const [key, value] = item.split('=');
        launchInfo.params[key] = value;
      });
      api.uploadLaunchInfo({ type: 'normalQRCode', launchInfo, options });
      if (launchInfo.params.shareUserId) {
      }
    }

    // 扫普通二维码进入小程序，获取参数，普通二维码是自己生成，不是调微信接口生成的
    if (options.query.q) {
      const q = decodeURIComponent(options.query.q); // 获取到二维码原始链接内容
      const scancode_time = parseInt(options.query.scancode_time); // 获取用户扫码时间 UNIX 时间戳
      const launchInfo = {
        userId: global.userInfo?.data?.userId,
        params: {
          scancode_time,
        },
      };
      const params = q.split('?')[1].split('&');
      params?.forEach((item) => {
        const [key, value] = item.split('=');
        launchInfo.params[key] = value;
      });
      global.launchInfo = launchInfo;
      api.uploadLaunchInfo({ type: 'wxQRCode', launchInfo, options });
      // setStorage('launchInfo', launchInfo);
    }
  }
  render() {
    return this.props.children;
  }
}

export default App;
