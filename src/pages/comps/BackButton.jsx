import { View } from '@tarojs/components';

export default () => {
  return (
    <View
      style={{
        borderRadius: '50%',
        backgroundColor: 'rgba(2, 0, 0, 0.5)',
        padding:5,
        // marginTop: '46px',
        // marginLeft: '10px',
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
          style={{
            fontSize: 18,
            
            color:"#cdcecd"
          }}
        />
      </View>
    </View>
  );
};
