import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtIcon } from 'taro-ui';

const CustomNavBar = () => {
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
          className="button-wrapper"
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
            <AtIcon value="chevron-left" size="24" color="#cdcecd" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomNavBar;
