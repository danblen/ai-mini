import { View } from '@tarojs/components';
import { AtDrawer } from 'taro-ui';

export default ({ showDrawer, onClose }) => {
  return (
    <AtDrawer
      show={showDrawer}
      left
      mask
      width="80%"
      onClose={onClose}
      style={{ background: 'black', height: '100%' }}>
      <View style={{ marginTop: '200rpx' }}>
        <View>微信用户</View>
        <View>设置</View>
        <View>深色模式</View>
        <View>退出登陆</View>
      </View>
    </AtDrawer>
  );
};
