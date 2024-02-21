import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Images from "./images.jsx";

import "taro-ui/dist/style/components/button.scss" // 按需引入
// import 'taro-ui/dist/style/index.scss'
export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <Images/>
    )
  }
}
