import '@nutui/nutui-react-taro/dist/style.css';
import 'taro-ui/dist/style/components/index.scss';
import { Component } from 'react';
import Taro from '@tarojs/taro';
import './app.scss';
import { init } from './common/init';
class App extends Component {
  constructor(props) {
    super(props);
    Taro.getApp().globalData = {
      clickCount: 0,
      updateGlobalClickCount: (value) => {
        Taro.getApp().globalData.clickCount += value;
      },
    };
    init();
  }

  render() {
    return this.props.children;
  }
}

export default App;
