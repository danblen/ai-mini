import { View } from '@tarojs/components';

const NavigationBar = () => {
  return (
    <View
      style={{
        height: '180rpx',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          color: 'white',
          marginTop: '90rpx',
          marginLeft: '20rpx',
        }}
        onClick={() => {
          setShowDrawer(true);
        }}
      >
        <View
          className="at-icon at-icon-menu"
          style={{
            fontSize: '50rpx',
            position: 'fixed',
            color: 'black',
          }}
        ></View>
      </View>
    </View>
  );
};

// 导出函数式组件
export default NavigationBar;
