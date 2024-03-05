import { Image, Text, View } from '@tarojs/components';
import AlbumsCard from './AlbumsCard.jsx';
import TitleView from './TitleView.jsx';
// import iconwechat from '../../../static/image/share/icon_wechat.png';
export default ({ allImages }) => {
  return (
    <View
      style={{
        marginTop: '18rpx',
        marginLeft: '18rpx',
        marginRight: '18rpx',
        borderRadius: '8rpx',
        paddingBottom: '8rpx',
        background: '0% 0% / cover rgb(204, 197, 197)',
        // background:'#fff'
      }}
    >
      <TitleView title="写真集" />

      <AlbumsCard albums={allImages?.albums} />
    </View>
  );
};
