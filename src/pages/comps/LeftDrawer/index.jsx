import { View } from '@tarojs/components';
import { AtDrawer } from 'taro-ui';
import List from './List';

export default ({ showDrawer, onClose }) => {
  return (
    <AtDrawer
      show={showDrawer}
      left
      mask
      width="45%"
      onClose={onClose}
      style={{ background: 'black', height: '100%' }}
    >
      <List onClose={onClose} />
    </AtDrawer>
  );
};
