import '@nutui/nutui-react-taro/dist/style.css';
import 'taro-ui/dist/style/components/index.scss';
import { Component } from 'react';
import Taro from '@tarojs/taro';

class App extends Component {
  constructor(props) {
    super(props);
    Taro.getApp().globalData = {
      clickCount: 0,
      updateGlobalClickCount: value => {
        Taro.getApp().globalData.clickCount += value;
      },
    };
  }
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    return this.props.children;
  }
}

export default App;
