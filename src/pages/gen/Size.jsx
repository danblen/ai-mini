import { Input, View } from '@tarojs/components';
import { AtInputNumber } from 'taro-ui';

export default ({ value, onChange }) => {
  return (
    <View
      style={{
        boxSizing: 'border-box',
        width: '96%',
        margin: '0 auto',
      }}
    >
      <View></View>
      <View>
        宽
        <AtInputNumber
          value={width}
          width="200"
          max={2000}
          style={{
            width: 100,
          }}
          onChange={onChange}
        />
      </View>
      <View>
        高
        <AtInputNumber
          max={2000}
          width="200"
          value={value}
          style={{
            width: 100,
            marginLeft: 10,
          }}
          onChange={onChange}
        />
      </View>
    </View>
  );
};
