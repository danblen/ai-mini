import { Image, Text, View } from '@tarojs/components';
import AlbumsCard from './AlbumsCard.jsx';
// import iconwechat from '../../../static/image/share/icon_wechat.png';
export default ({ allImages }) => {
  return (
    <View
      style={{
        // marginTop: '20px',
        // paddingTop: 10,
        marginLeft: '18rpx',
        marginRight: '18rpx',
        borderRadius: '8rpx',
        background: '#dcdadacf',
        // background:'#fff'
      }}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: 40,
        }}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '96%',
          }}
        >
          <View
            style={{
              display: 'flex',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              写真集
            </Text>
          </View>
          <View
            style={{
              color: 'grey',
              fontSize: 12,
            }}
            onClick={() => {}}
          >
            查看全部
          </View>
        </View>
      </View>
      <AlbumsCard albums={allImages?.albums} />
    </View>
  );
};
