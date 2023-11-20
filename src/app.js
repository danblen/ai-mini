import "@nutui/nutui-react-taro/dist/style.css";
import "taro-ui/dist/style/components/index.scss";

import { Component } from "react";
import "./app.less";
import "./app1.css";
// import "@taroify/core/rate/style";
// import "@taroify/icons/index.scss";
// import "@taroify/core/index.scss";
// import 'taro-ui/dist/style/index.scss'
class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
