import 'taro-ui/dist/style/components/index.scss';
import { Component } from 'react';
import Taro from '@tarojs/taro';
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

  render() {
    return this.props.children;
  }
}

export default App;
