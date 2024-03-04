import { Image, Text, View } from '@tarojs/components';
import AlbumsCard from './AlbumsCard.jsx';
// import iconwechat from '../../../static/image/share/icon_wechat.png';
export default ({ allImages }) => {
  return (
    <View
      style={{
        // marginTop: '20px',
        paddingTop: 10,
        marginLeft: '18rpx',
        marginRight: '18rpx',
        borderRadius: '8rpx',
        background: '#dcdadacf',
        // background:'#fff'
      }}
    >
      <View
        style={{
          fontSize: '36rpx',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            marginLeft: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          写真集
        </Text>
        <View
          style={{
            display: 'flex',
            color: 'grey',
            justifyContent: 'space-between',
          }}
        >
          <View style={{}}>更多</View>
          <View
            className="at-icon at-icon-chevron-right"
            style={{
              fontSize: '50rpx',
            }}
          ></View>
        </View>
      </View>
      <AlbumsCard albums={allImages?.albums} />
    </View>
  );
};
