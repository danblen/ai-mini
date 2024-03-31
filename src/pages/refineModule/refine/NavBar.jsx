import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';

export default () => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'fixed',
          zIndex: 20,
        }}
      >
        <View
          style={{
            borderRadius: '50%',
            backgroundColor: 'rgba(2, 0, 0, 0.5)',
            marginTop: '46px',
            marginLeft: '10px',
            position: 'absolute',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={() => {
              if (Taro.getCurrentPages().length > 1) {
                Taro.navigateBack();
              }
            }}
          >
            <View
              className="at-icon at-icon-chevron-left"
              style={{ fontSize: 24 }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
