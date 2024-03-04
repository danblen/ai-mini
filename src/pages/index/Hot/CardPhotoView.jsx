import { Image, Text, View } from '@tarojs/components';
import AlbumsCard from './AlbumsCard.jsx';
import TitleView from './TitleView.jsx';
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
      <TitleView title="写真集" />

      <AlbumsCard albums={allImages?.albums} />
    </View>
  );
};
