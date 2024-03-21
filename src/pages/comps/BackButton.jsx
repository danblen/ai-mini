import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

export default () => {
  return (
    <View
      style={{
        borderRadius: '50%',
        backgroundColor: 'rgba(2, 0, 0, 0.5)',
        top: 50,
        left: 15,
        width: 30,
        height: 30,
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
      }}
      onClick={() => {
        if (Taro.getCurrentPages().length > 1) {
          Taro.navigateBack();
        }
      }}
    >
      <View
        className="at-icon at-icon-chevron-left"
        style={{
          fontSize: 18,
          paddingLeft: 5,
          paddingTop: 2,
          color: 'white',
        }}
      />
    </View>
  );
};
